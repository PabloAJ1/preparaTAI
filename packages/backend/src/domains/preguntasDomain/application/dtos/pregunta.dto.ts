import { IEstadosticasDto } from './estadisticas.dto';
import { IRespuestaDto } from './respuesta.dto';

export interface IPreguntaDto extends IPreguntaDtoBase {
	categorias: string[];
}

export interface IPreguntaDtoBase {
	id: string;
	enunciado: string;
	codigo?: string;
	estado: string;
	respuestas: IRespuestaDto[];
	estadisticas: IEstadosticasDto
}
