import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IGetPreguntaById {
	exec(idPregunta: string): Promise<IPreguntaDto>
}