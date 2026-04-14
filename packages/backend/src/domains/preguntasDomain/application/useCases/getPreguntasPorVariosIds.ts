import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { SelectorRespuestasService } from "../services/SelectorRespuestas.service";
import { IGetVariasPreguntasPorIds } from "../signatures/getVariasPreguntasPorIds.interface";

export class GetVariasPreguntasPorIds implements IGetVariasPreguntasPorIds {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository
	){}

	async exec(idsPreguntas: string[]): Promise<IPreguntaDto[]>{
		const result = await this.preguntaRepository.getVariasPreguntasPorIds(idsPreguntas);

		const preguntasRespuestasMezcladas = SelectorRespuestasService.generarPreguntasConRespuestasMezcladas(result)
		return preguntasRespuestasMezcladas.map(MapsPregunta.toDto)
	}
}