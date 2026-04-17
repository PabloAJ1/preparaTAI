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

		const idsDePagina = session.obtenerPagina(page, limit);
		const preguntas = await this.preguntaRepository.getVariasPreguntasPorIds(idsDePagina)

		return {
			idPractica: practica.id,
			nombrePractica: practica.nombrePractica,
			preguntas: await this.generarListaPreguntasService.generar(preguntas, idsDePagina, TTipoPreguntas.PRACTICA)
		}
	}
}