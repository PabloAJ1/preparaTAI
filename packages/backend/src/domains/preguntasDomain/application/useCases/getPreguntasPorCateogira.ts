import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { SelectorRespuestasService } from "../services/SelectorRespuestas.service";
import { IGetPreguntasPorCateogira } from "../signatures/getPreguntasPorCateogira.interface";

export class GetPreguntasPorCateogira implements IGetPreguntasPorCateogira {
	constructor(private readonly preguntaRepository: IPreguntaRepository){}

	async exec(idCategoria: string): Promise<IPreguntaDto[]>{
		const preguntas = await this.preguntaRepository.getPreguntasPorCategoria(idCategoria);

		const preguntasRespuestasMezcladas = SelectorRespuestasService.generarPreguntasConRespuestasMezcladas(preguntas)
		const preguntasMapeadas = preguntasRespuestasMezcladas.map(MapsPregunta.toDto)
		return preguntasMapeadas;
	}
}