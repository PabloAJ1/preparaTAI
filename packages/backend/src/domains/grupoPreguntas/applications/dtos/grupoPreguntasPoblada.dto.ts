import { IPreguntaDto } from "./pregunta.dto";

export interface IGrupoPreguntasPobladaDto {
	textoPre: string;
	textoPos: string;
	codigo: {
		codigo: string;
		lenguaje: string;
	},
	preguntas: IPreguntaDto[];
}