import { Pregunta } from "../../domain/entities/Pregunta";

export interface IMezclarPreguntasService {
	mezclarPreguntas(preguntas: Pregunta[], seed: number): Pregunta[],
	ordenarPorListaIds(
		preguntas: Pregunta[],
		idsOrdenados: string[],
	): Pregunta[]
}