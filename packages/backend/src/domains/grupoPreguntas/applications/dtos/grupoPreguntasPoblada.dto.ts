import { IPreguntaDto } from "./pregunta.dto";

export interface IGrupoPreguntasPobladaDto {
	id: string;
	idGrupoPregunta: string;
	textoPre: string;
	textoPos: string;
	codigo: {
		codigo: string;
		lenguaje: string;
	},
	preguntas: IPreguntaDto[];
}