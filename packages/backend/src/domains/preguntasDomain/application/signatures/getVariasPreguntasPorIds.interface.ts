import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IGetVariasPreguntasPorIds {
	exec(idsPreguntas: string[]): Promise<IPreguntaDto[]>
}