import { IContenidoPregunta } from "./contenidoPregunta.interface";
import { IEstadisticas } from "./estadisticas.interface";
import { IRespuesta } from "./respuesta.interface";

export interface IPregunta {
	idPregunta: string;
	enunciado: IContenidoPregunta;
	respuestas: IRespuesta[];
	categorias: string[];
	estadisticas: IEstadisticas;
	randomKey: number;
	descartada: boolean;
	estado: string;
}