import { IEstadosticasDto } from './estadisticas.dto';
import { IRespuestaDto } from './respuesta.dto';

export interface IPreguntaDto {
	id: string;
	enunciado: string;
	respuestas: IRespuestaDto[];
	categorias: string[];
	estadisticas: IEstadosticasDto
}
