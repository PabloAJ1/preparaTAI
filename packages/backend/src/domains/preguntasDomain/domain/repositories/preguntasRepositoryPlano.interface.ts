import { Pregunta } from "../entities/Pregunta";

export interface IPreguntaRepositoryPlano {
	crear(preguntas: Pregunta[]): string[];
}