import { IRespuestaDto } from './respuesta.dto';

export interface IPreguntaAtlasDto {
	id: string;
	enunciado: string;
	estado: string;
	respuestas: IRespuestaDto[];
	categorias: string[];
}
