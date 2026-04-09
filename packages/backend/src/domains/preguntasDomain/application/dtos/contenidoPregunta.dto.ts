export interface IContenidoPreguntaDto {
	enunciado: string;
	codigo?: {
		codigo: string,
		lenguaje: string,
	};
	imagen?: string;
}