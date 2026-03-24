export interface IPreguntaDto {
	id: string;
	categoria: string;
	enunciado: string;
	respuestas: {
		enunciado: string;
		correcta: boolean;
	}[]
}
