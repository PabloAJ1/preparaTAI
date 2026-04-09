import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IUpdatePreguntaById } from "../signatures/updatePreguntaById.interface";

export class UpdatePreguntaById implements IUpdatePreguntaById {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository
	){};

	async exec(preguntaDto: IPreguntaDto): Promise<IPreguntaDto> {
		const pregunta = await this.preguntaRepository.getPreguntaById(preguntaDto.id);
		const preguntaActualizadaEntity = MapsPregunta.toEntity(preguntaDto)
		pregunta.actualizaPregunta(preguntaActualizadaEntity)
		const preguntaActualizada = await this.preguntaRepository.updatePreguntaById(pregunta);

		return MapsPregunta.toDto(preguntaActualizada)
	}
}