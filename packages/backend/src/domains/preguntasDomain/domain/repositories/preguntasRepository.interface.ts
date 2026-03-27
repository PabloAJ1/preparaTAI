import { Pregunta } from '../entities/Pregunta';

export interface IPreguntaRepository {
	createPregunta(pregunta: Pregunta): Promise<Pregunta>;
	getNumeroPreguntasTotales(): Promise<number>;
	getNumeroPreguntasPorCategoria(nombreCategoria: string): Promise<number>;
	getPreguntasPorCategoria(nombreCategoria: string): Promise<Pregunta[]>;
	getPreguntasPorCategoriaPaginando(idCategoria: string, pagina: number, limit: number): Promise<Pregunta[]>;
	getPreguntasPorCategoriaPaginandoConSeed(idCategoria: string, pagina: number, limit: number, seed: number): Promise<Pregunta[]>;
	getAllPreguntas(): Promise<Pregunta[]>
	getPreguntaById(idPregunta: string): Promise<Pregunta>;
	updatePreguntaById(pregunta: Pregunta): Promise<Pregunta>;
	reiniciarAllEstadisticas(): Promise<void>;
}
