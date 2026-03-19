import { IPreguntaRepository } from '../../domain/repositories/preguntasRepository.interface';
import { IPreguntaDto } from '../dtos/pregunta.dto';
import { MapsPregunta } from '../mappers/mapDtoToEntityPregunta.mapper';
import { ICrearPregunta } from '../signatures/createPregunta.interface';

export class CrearPregunta implements ICrearPregunta {
	constructor(private readonly preguntaRepository: IPreguntaRepository) {}

	async exec(preguntaDto: IPreguntaDto): Promise<IPreguntaDto> {
		const entity = MapsPregunta.toEntity(preguntaDto);
		const saved = await this.preguntaRepository.createPregunta(entity);
		const savedDto = MapsPregunta.toDto(saved);
		return savedDto;
	}
}
