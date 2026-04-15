/**
 * Esta clase seleccionara el numero de respuestas que se le van a enviar al usuario,
 * tmabien mezclara las respuestas para que cada vez se le devulevan de forma distinta
 */

import { Pregunta } from '../../domain/entities/Pregunta';
import { TTipoPreguntas } from '../../domain/enums/tipoPreguntas.enum';
import { RespuestaVo } from '../../domain/valueObjects/RespuestaVo';
import { ISelectorRespuestasService } from '../signatures/SelectorRespuestasService.interface';

export class SelectorRespuestasService implements ISelectorRespuestasService {
	generar(
		preguntas: Pregunta[], 
		tipo: TTipoPreguntas = TTipoPreguntas.DEFAULT,
		numeroRespuestas = 4,
	): Pregunta[] {
		const poolRespuestas = preguntas.map(p => p.respuestaCorrecta);

		return preguntas.map(p => {
			const incorrectasUnicas: RespuestaVo[] = 
				this.#obtenerPoolIncorrectas(
					tipo,
					poolRespuestas,
					p
				)

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

	#generarRespuestas(
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

	#obtenerPoolIncorrectas(tipo: TTipoPreguntas, poolRespuestas: RespuestaVo[], pregunta: Pregunta){
		const respuestasIncorrectas = (tipo === "DEFAULT") 
			? pregunta.respuestasIncorrecta 
			: poolRespuestas;

		return this.#poolIncorrectas(respuestasIncorrectas, pregunta)
	}

	#poolIncorrectas(pool: RespuestaVo[], pregunta: Pregunta,){
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

	#shuffle(respuestas: RespuestaVo[]): RespuestaVo[] {
		const arr = [...respuestas];

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}
}
