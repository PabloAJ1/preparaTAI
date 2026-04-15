import { Pregunta } from "../../domain/entities/Pregunta";
import { TTipoPreguntas } from "../../domain/enums/tipoPreguntas.enum";

export interface ISelectorRespuestasService {
	generar(
		preguntas: Pregunta[], 
		tipo?: TTipoPreguntas,
		numeroRespuestas?: number,
	): Pregunta[]
}