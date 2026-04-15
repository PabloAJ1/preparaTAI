import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGetPreguntasPorCateogira } from "../signatures/getPreguntasPorCateogira.interface";
import { ISelectorRespuestasService } from "../signatures/SelectorRespuestasService.interface";

export class GetPreguntasPorCateogira implements IGetPreguntasPorCateogira {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly selectorRespuestasService: ISelectorRespuestasService
	){}

	async exec(idCategoria: string): Promise<IPreguntaDto[]>{
		const preguntas = await this.preguntaRepository.getPreguntasPorCategoria(idCategoria);

		const preguntasRespuestasMezcladas = this.selectorRespuestasService.generar(preguntas)
		const preguntasMapeadas = preguntasRespuestasMezcladas.map(MapsPregunta.toDto)
		return preguntasMapeadas;
	}
}