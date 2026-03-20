export interface IPreguntaDto {
	id: string;
	enunciado: string;
	respuestas: {
		enunciado: string;
		correcta: boolean;
	}[]
}
