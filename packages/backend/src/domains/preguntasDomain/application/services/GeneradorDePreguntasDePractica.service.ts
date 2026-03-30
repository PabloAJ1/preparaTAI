import { Pregunta } from "../../domain/entities/Pregunta";
import { EstadisticaVO } from "../../domain/valueObjects/estadistica.vo";
import { RespuestaVo } from "../../domain/valueObjects/RespuestaVo";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { IPreguntaMigrationDto } from "../dtos/preguntaMigration.interface";
import { IGeneradorDePreguntasDePracticaService } from "../signatures/generadorDePreguntasDePracticaService.interface";

export class GeneradorDePreguntasDePracticaService implements IGeneradorDePreguntasDePracticaService {
	exec(preguntas: IPreguntaMigrationDto[], categorias: Map<string, ICategoriaDto>): Pregunta[] {
		return this.#construirPreguntas(preguntas, categorias)
	}

	#construirPreguntas(preguntas: IPreguntaMigrationDto[], categorias: Map<string, ICategoriaDto>): Pregunta[] {
		const preguntasFinales: Pregunta[] = [];
		const preguntasPorCategoria = this.#agruparPorCategoria(preguntas);

		for (const [categoriaNombre, grupo] of preguntasPorCategoria) {
			for (const pregunta of grupo) {
				const categoria = categorias.get(categoriaNombre)?.idCategoria;
				if (!categoria) continue;

				const respuestaCorrecta = pregunta.respuestas.find((r) => r.correcta);

				if (!respuestaCorrecta?.enunciado) continue;

				/**
				 * Creamos un set con las respuestas incorrectas para que no se repitan por cada grupo de pregutnas
				 * Ademnás tenemos que almacenar la respuesta correcta por que puede existir como respuesta incorrecta en otra 
				 * pregunta del grupo
				 */
				const respuestaCorrectaStr = respuestaCorrecta.enunciado;
				const respuestasIncorrectas = [
 					...new Set(
						grupo
						.map((p) => p.respuestas.find((r) => r.correcta)?.enunciado)
						.filter((r): r is string => !!r && r !== respuestaCorrectaStr)
					)
				].map((enunciado) =>
					RespuestaVo.crear({
						enunciado,
						correcta: false,
					})
				);

				const respuestas: RespuestaVo[] = [
					RespuestaVo.crear({ enunciado: respuestaCorrecta.enunciado, correcta: true }),
					...respuestasIncorrectas,
				];

				preguntasFinales.push(
					Pregunta.crear({
					enunciado: pregunta.enunciado,
					categorias: [categoria],
					respuestas,
					estadisticas: EstadisticaVO.inicializar(),
				}));
			}
		}
		return preguntasFinales;
	}
	
	#agruparPorCategoria(preguntas: IPreguntaMigrationDto[]): Map<string, IPreguntaMigrationDto[]> {
		const mapa = new Map<string, IPreguntaMigrationDto[]>();

		for (const pregunta of preguntas) {
			const categoria = pregunta.categorias.find((c) => c.nombreCategoria !== '2026');

			if (!categoria) continue;

			if (!mapa.has(categoria.nombreCategoria)) {
				mapa.set(categoria.nombreCategoria, []);
			}

			mapa.get(categoria.nombreCategoria)!.push(pregunta);
		}

		return mapa;
	}
}