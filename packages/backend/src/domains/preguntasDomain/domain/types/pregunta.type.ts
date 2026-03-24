import { RespuestaVo } from '../valueObjects/RespuestaVo';

export type TPregunta = {
	idPregunta: string;
	enunciado: string;
	categorias: string[];
	respuestas: RespuestaVo[];
};
