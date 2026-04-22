import { TTipoPreguntas } from "../../../domain/enums/tipoPreguntas.enum";
import { IPracticaRepository } from "../../../domain/repositories/practicaRepository.interface";
import { IPreguntaRepository } from "../../../domain/repositories/preguntasRepository.interface";
import { IPreguntasSessionSevice } from "../../../domain/signatures/PreguntasSessionSevice.interfcae";
import { IPracticaPobladaDto } from "../../dtos/practicaPoblada.dto";
import { IGenerarListaPreguntasService } from "../../signatures/GenerarListaPreguntasService.interface";
import { IGetPreguntasPractica } from "../../signatures/getPracticaById.interface";

export class GetPreguntasPractica implements IGetPreguntasPractica {
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

		const todasLasPreguntas = await this.preguntaRepository.getVariasPreguntasPorIds(idsPreguntas)

		const preguntasGeneradas = await this.generarListaPreguntasService.generar(
			todasLasPreguntas,
			idsPreguntas,
			TTipoPreguntas.PRACTICA
		)

		const idsDePagina = session.obtenerPagina(page, limit);

		const preguntasPagina = preguntasGeneradas.filter(p => idsDePagina.includes(p.id))

		return {
			idPractica: practica.id,
			nombrePractica: practica.nombrePractica,
			preguntas: preguntasPagina
		};
	}
}