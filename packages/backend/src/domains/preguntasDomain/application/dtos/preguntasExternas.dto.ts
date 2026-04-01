import { IRespuestaDto } from './respuesta.dto';

export interface IPreguntaExternasDto {
	id: string;
	enunciado: string;
	estado: string;
	respuestas: IRespuestaDto[];
	categorias: string[];
}
