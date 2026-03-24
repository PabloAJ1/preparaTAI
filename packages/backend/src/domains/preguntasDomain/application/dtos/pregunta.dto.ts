import { IRespuestaDto } from './respuesta.dto';

export interface IPreguntaDto {
	id: string;
	enunciado: string;
	respuestas: IRespuestaDto[];
	categorias: string[];
}
