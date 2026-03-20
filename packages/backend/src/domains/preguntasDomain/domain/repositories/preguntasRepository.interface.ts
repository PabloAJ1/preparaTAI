import { Pregunta } from '../entities/Pregunta';

export interface IPreguntaRepository {
	createPregunta(pregunta: Pregunta): Promise<Pregunta>;
	getNumeroPreguntasTotales(): Promise<number>;
	getNumeroPreguntasPorCategoria(nombreCategoria: string): Promise<number>;
	getPreguntasPorCategoria(nombreCategoria: string): Promise<Pregunta[]>;
}
