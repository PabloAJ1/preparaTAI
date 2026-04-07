export interface IGrupoPreguntasDto {
	id: string;
	idGrupoPregunta: string;
	textoPre: string;
	textoPos: string;
	codigo: {
		codigo: string;
		lenguaje: string;
	},
	idPreguntas: string[];
}