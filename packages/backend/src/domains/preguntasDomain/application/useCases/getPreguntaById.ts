import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGetPreguntaById } from "../signatures/getPreguntaById.interface";

export class GetPreguntaById implements IGetPreguntaById {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository
	){}

	async exec(idPregunta: string): Promise<IPreguntaDto>{
		const result = await this.preguntaRepository.getPreguntaById(idPregunta);
		const preguntaDto = MapsPregunta.toDto(result)
		return preguntaDto;
	}
}