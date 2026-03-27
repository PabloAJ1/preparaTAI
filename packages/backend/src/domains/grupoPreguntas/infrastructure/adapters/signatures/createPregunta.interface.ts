import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface ICreatePregunta {
	exec(pregunta: IPreguntaDto): Promise<IPreguntaDto>;
}