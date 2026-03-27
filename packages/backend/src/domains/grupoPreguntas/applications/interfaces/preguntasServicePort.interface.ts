import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IPreguntasServicePort {
	getPreguntasPorId(preguntas: string[]): Promise<IPreguntaDto[]>;
	createPreguntas(preguntas: IPreguntaDto[]): Promise<string[]>;
}