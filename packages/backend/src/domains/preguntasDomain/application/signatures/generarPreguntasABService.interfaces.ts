import { Pregunta } from "../../domain/entities/Pregunta";
import { IPreguntasAB } from "../dtos/preguntasAB.dto";

export interface IGenerarPreguntasABService {
	generar(preguntaAB: IPreguntasAB): Promise<Pregunta[]>
}