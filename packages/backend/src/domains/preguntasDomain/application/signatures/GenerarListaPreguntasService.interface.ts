import { Pregunta } from "../../domain/entities/Pregunta";
import { TTipoPreguntas } from "../../domain/enums/tipoPreguntas.enum";
import { IPreguntaPobladaDto } from "../dtos/preguntaPoblada.dto";

export interface IGenerarListaPreguntasService {
	generar(preguntas: Pregunta[], idsDePagina: string[], tipoPreguntas?: TTipoPreguntas): Promise<IPreguntaPobladaDto[]>
}