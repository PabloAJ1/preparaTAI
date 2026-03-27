import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IGetVariasPreguntasPorId {
	exec(idPreguntas: string[]): Promise<IPreguntaDto[]>;
}