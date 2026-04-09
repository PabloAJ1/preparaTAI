import { EEstado } from '../enums/estado.enum';
import { ContenidoPregunta } from '../valueObjects/contenidoPregunta.vo';
import { EstadisticaVO } from '../valueObjects/estadistica.vo';
import { RespuestaVo } from '../valueObjects/RespuestaVo';

export type TPregunta = {
	idPregunta: string;
	enunciado: ContenidoPregunta;
	categorias: string[];
	respuestas: RespuestaVo[];
	estadisticas: EstadisticaVO;
	estado: EEstado
};
