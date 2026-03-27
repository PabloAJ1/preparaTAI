export interface IGrupoPreguntasDto {
	id: string;
	textoPre: string;
	textoPos: string;
	codigo: {
		codigo: string;
		lenguaje: string;
	},
	idPreguntas: string[];
}