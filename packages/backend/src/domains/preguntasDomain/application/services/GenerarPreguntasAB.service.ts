import { Pregunta } from "../../domain/entities/Pregunta";
import { EEstado } from "../../domain/enums/estado.enum";
import { ContenidoPregunta } from "../../domain/valueObjects/contenidoPregunta.vo";
import { RespuestaVo } from "../../domain/valueObjects/RespuestaVo";
import { IPreguntasAB } from "../dtos/preguntasAB.dto";
import { ICategoriaAdapterService } from "../ports/categoriaAdapterService.interface";
import { IGenerarPreguntasABService } from "../signatures/generarPreguntasABService.interfaces";

export class GenerarPreguntasABService implements IGenerarPreguntasABService {
	constructor(
		private readonly categoriaAdapterService : ICategoriaAdapterService
	){}

	async generar(preguntaAB: IPreguntasAB): Promise<Pregunta[]> {
		const categoria = await this.categoriaAdapterService.searchAndCreateCategoria({
			idCategoria: 'desconocido',
			nombreCategoria: preguntaAB.categoria.nombre,
			tipo: preguntaAB.categoria.tipo,
		})

		const arrayPreguntas: Pregunta[] = [
			...this.#generarParte(preguntaAB.enunciadoA, preguntaAB.respuestasA, preguntaAB.respuestasB, categoria.idCategoria),
			...this.#generarParte(preguntaAB.enunciadoB, preguntaAB.respuestasB, preguntaAB.respuestasA, categoria.idCategoria)
		]

		return arrayPreguntas;
	}

	#generarParte(
		enunciado: string, 
		respuestasCorrecta: string[], 
		respuestasIncorrectas: string[],
		idCategoria: string
	): Pregunta[] {
		const preguntas: Pregunta[] = [];
		respuestasCorrecta.forEach(r => {
			preguntas.push(this.#generarPregunta(
				enunciado,
				r,
				respuestasIncorrectas,
				idCategoria
			))
		})

		return preguntas;
	}

	#generarPregunta(
		enunciado: string, 
		respuestaCorrecta: string, 
		respuestasIncorrectas: string[],
		idCategoria: string
	): Pregunta{
		const respuestasInc: RespuestaVo[] = respuestasIncorrectas.map(inc => {
			return RespuestaVo.crear({
				enunciado: inc,
				correcta: false
			})
		})
		const respuestaCor: RespuestaVo = RespuestaVo.crear({
			enunciado: respuestaCorrecta,
			correcta: true
		});

		return Pregunta.crear({
			categorias: [idCategoria],
			enunciado: ContenidoPregunta.crearPregunta({
				enunciado: enunciado
			}),
			respuestas: [
				respuestaCor,
				...respuestasInc
			],
			estado: EEstado.REVISADO,
		})
	}


}