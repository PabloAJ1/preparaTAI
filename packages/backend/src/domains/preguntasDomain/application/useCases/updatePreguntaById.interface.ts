import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { PreguntaUpdateDto } from "../dtos/preguntaUpdate.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IUpdatePreguntaById } from "../signatures/updatePreguntaById.interface";

export class UpdatePreguntaById implements IUpdatePreguntaById {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository
	){};

	async exec(preguntaDto: PreguntaUpdateDto): Promise<IPreguntaDto> {
		const pregunta = await this.preguntaRepository.getPreguntaById(preguntaDto.id);
		pregunta.cambiarEnunciado(preguntaDto.enunciado);
		const preguntaActualizada = await this.preguntaRepository.updatePreguntaById(pregunta);

		return MapsPregunta.toDto(preguntaActualizada)
	}
}