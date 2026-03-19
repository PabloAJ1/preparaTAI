import { IPreguntaDto } from '../dtos/pregunta.dto';

export interface ICrearPregunta {
	exec(preguntaDto: IPreguntaDto): Promise<IPreguntaDto>;
}
