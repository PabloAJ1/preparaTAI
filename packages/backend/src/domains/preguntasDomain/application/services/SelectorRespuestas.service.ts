/**
 * Esta clase seleccionara el numero de respuestas que se le van a enviar al usuario,
 * tmabien mezclara las respuestas para que cada vez se le devulevan de forma distinta
 */

import { Pregunta } from '../../domain/entities/Pregunta';
import { RespuestaVo } from '../../domain/valueObjects/RespuestaVo';

export class SelectorRespuestasService {
	static generarPreguntasConRespuestasMezcladas(
		preguntas: Pregunta[], 
		tipo: "PRACTICA" | "DEFAULT" = "DEFAULT",
		numeroRespuestas = 4,
	): Pregunta[] {
		const poolRespuestas = preguntas.map(p => p.respuestaCorrecta);

		return preguntas.map(p => {
			let incorrectasUnicas: RespuestaVo[] = []

			if(tipo === "DEFAULT"){
				incorrectasUnicas = this.#poolIncorrectas(p.respuestasIncorrecta, p)
			}else {
				incorrectasUnicas = this.#poolIncorrectas(poolRespuestas, p)
			}

			const respuestas = this.#generarRespuestas(
				p,
				incorrectasUnicas,
				numeroRespuestas
			);

			return Pregunta.crear({
				categorias: p.categorias,
				enunciado: p.enunciado,
				idPregunta: p.idPregunta,
				respuestas,
				estadisticas: p.estadisticas,
				estado: p.estado
			});
		});
	}

	static #generarRespuestas(
		pregunta: Pregunta,
		incorrectasUnicas: RespuestaVo[],
		numeroRespuestas: number
	): RespuestaVo[] {

		if (!pregunta.respuestaCorrecta) {
			throw new Error("No hay respuesta correcta");
		}

		const seleccionadas = this.#shuffle(incorrectasUnicas)
			.slice(0, numeroRespuestas - 1);

		return this.#shuffle([
			pregunta.respuestaCorrecta,
			...seleccionadas.map(r => RespuestaVo.crear({enunciado: r.enunciado, correcta: false, id: r.id }))
		]);
	}

	static #poolIncorrectas(pool: RespuestaVo[], pregunta: Pregunta,){
		const seen = new Set<string>();
		const incorrectasUnicas = [];

		for (const r of pool) {
			if (
				r.id !== pregunta.respuestaCorrecta.id &&
				r.enunciado !== pregunta.respuestaCorrecta.enunciado &&
				!seen.has(r.enunciado)
			) {
				seen.add(r.enunciado);
				incorrectasUnicas.push(r);
			}		
		}
		return incorrectasUnicas;
	}

	static #shuffle(respuestas: RespuestaVo[]): RespuestaVo[] {
		const arr = [...respuestas];

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}
}
