import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGetPreguntasPorCateogira } from "../signatures/getPreguntasPorCateogira.interface";

export class GetPreguntasPorCateogira implements IGetPreguntasPorCateogira {
	constructor(private readonly preguntaRepository: IPreguntaRepository){}

	async exec(idCategoria: string): Promise<IPreguntaDto[]>{
		const preguntas = this.preguntaRepository.getPreguntasPorCategoria(idCategoria);
		const preguntasMapeadas = (await preguntas).map(MapsPregunta.toDto)

		return preguntasMapeadas;
	}
}