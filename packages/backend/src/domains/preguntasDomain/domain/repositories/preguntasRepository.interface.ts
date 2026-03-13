import { Pregunta } from '../entities/Pregunta';

export interface IPreguntaRepository {
	createPregunta(pregunta: Pregunta): Promise<Pregunta>;
}
