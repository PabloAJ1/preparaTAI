import { IPreguntaDto } from "../dtos/pregunta.dto";
import { IPreguntasAB } from "../dtos/preguntasAB.dto";

export interface IGenerarPreguntasAB {
	exec(preguntaAB: IPreguntasAB): Promise<IPreguntaDto[]>
}