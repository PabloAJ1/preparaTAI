import { RespuestaVo } from '../valueObjects/RespuestaVo';

export type TPregunta = {
	idPregunta: string;
	enunciado: string;
	//categorias: Categoria[] Ya lo meteremos
	respuestas: RespuestaVo[];
};
