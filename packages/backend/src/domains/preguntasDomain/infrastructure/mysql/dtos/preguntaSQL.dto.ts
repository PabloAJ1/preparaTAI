import { RowDataPacket } from "mysql2";

export interface IPreguntaSQL extends RowDataPacket {
	idPregunta: string;
	categoria: string;
	enunciado: string;
	respuestaCorrecta: string;
	respuestaIncorrecta: string;
	justificacion: string;
	bloque: number;
	tema: number;
	
}