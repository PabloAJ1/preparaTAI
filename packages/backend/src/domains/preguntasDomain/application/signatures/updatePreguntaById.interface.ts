import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IUpdatePreguntaById {
	exec(preguntaDto: IPreguntaDto): Promise<IPreguntaDto>;
}