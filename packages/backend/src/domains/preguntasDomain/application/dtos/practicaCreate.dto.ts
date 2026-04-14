export interface IPracticaCreateDto {
	estado: string;
	nombrePractica: string;
	pregunta:{
		enunciado: string;
		respuesta: string;
	}[]
}