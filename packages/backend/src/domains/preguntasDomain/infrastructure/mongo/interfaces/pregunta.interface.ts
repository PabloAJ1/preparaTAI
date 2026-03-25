import { IEstadisticas } from "./estadisticas.interface";
import { IRespuesta } from "./respuesta.interface";

export interface IPregunta {
	idPregunta: string;
	enunciado: string;
	respuestas: IRespuesta[];
	categorias: string[];
	estadisticas: IEstadisticas;
}