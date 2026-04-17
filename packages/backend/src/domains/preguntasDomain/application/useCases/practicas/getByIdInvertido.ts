import { Pregunta } from "../../../domain/entities/Pregunta";
import { TTipoPreguntas } from "../../../domain/enums/tipoPreguntas.enum";
import { IPracticaRepository } from "../../../domain/repositories/practicaRepository.interface";
import { IPreguntaRepository } from "../../../domain/repositories/preguntasRepository.interface";
import { IPreguntasSessionSevice } from "../../../domain/signatures/PreguntasSessionSevice.interfcae";
import { ContenidoPregunta } from "../../../domain/valueObjects/contenidoPregunta.vo";
import { RespuestaVo } from "../../../domain/valueObjects/RespuestaVo";
import { IPracticaPobladaDto } from "../../dtos/practicaPoblada.dto";
import { IGenerarListaPreguntasService } from "../../signatures/GenerarListaPreguntasService.interface";
import { IGetPreguntasPractica } from "../../signatures/getPracticaById.interface";

export class GetPreguntasPracticaInvertidas implements IGetPreguntasPractica {
	constructor(		
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly practicaRepository: IPracticaRepository,
		private readonly preguntasSessionSevice: IPreguntasSessionSevice,
		private readonly generarListaPreguntasService: IGenerarListaPreguntasService,
	){}

	async exec(
		idPractica: string,
		page = 1, 
		limit = 50,
		seed = Date.now()
	): Promise<IPracticaPobladaDto>{
		const practica = await this.practicaRepository.getPracticaPorId(idPractica);
		const idsPreguntas = [...practica.relacionPreguntasRespuestas.keys()]
		const session = await this.preguntasSessionSevice.getOrCreate(seed, idsPreguntas)

		const idsDePagina = session.obtenerPagina(page, limit);
		const preguntas = await this.preguntaRepository.getVariasPreguntasPorIds(idsDePagina)

		const preguntasInvertidas = preguntas.map(this.#invertir)

		return {
			idPractica: practica.id,
			nombrePractica: practica.nombrePractica,
			preguntas: await this.generarListaPreguntasService.generar(preguntasInvertidas, idsDePagina, TTipoPreguntas.PRACTICA)
		}
	}

	#invertir(pregunta: Pregunta){
		const respuestaCorrecta = RespuestaVo.crear({
			correcta: true,
			enunciado: pregunta.enunciado.enunciado
		})
		const enunciado = ContenidoPregunta.crearPregunta({
			enunciado: pregunta.respuestaCorrecta.enunciado
		})

		return Pregunta.crear({
			categorias: pregunta.categorias,
			enunciado: enunciado,
			respuestas: [respuestaCorrecta],
			estadisticas: pregunta.estadisticas,
			estado: pregunta.estado,
			idPregunta: pregunta.idPregunta
		})
	}
}