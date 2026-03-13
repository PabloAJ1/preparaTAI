import { IRespuestaDto } from "./respuesta.dto";

export interface IPreguntaDto {
	enunciado: string;
	respuestas: IRespuestaDto[]
}