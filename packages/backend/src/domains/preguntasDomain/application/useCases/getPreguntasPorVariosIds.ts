import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGetVariasPreguntasPorIds } from "../signatures/getVariasPreguntasPorIds.interface";
import { ISelectorRespuestasService } from "../signatures/SelectorRespuestasService.interface";

export class GetVariasPreguntasPorIds implements IGetVariasPreguntasPorIds {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly selectorRespuestasService: ISelectorRespuestasService
	){}

	async exec(idsPreguntas: string[]): Promise<IPreguntaDto[]>{
		const result = await this.preguntaRepository.getVariasPreguntasPorIds(idsPreguntas);

		const preguntasRespuestasMezcladas = this.selectorRespuestasService.generar(result)
		return preguntasRespuestasMezcladas.map(MapsPregunta.toDto)
	}
}