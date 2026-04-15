import { Pregunta } from "../../domain/entities/Pregunta";
import { IPreguntaPobladaDto } from "../dtos/preguntaPoblada.dto";

export interface IGenerarListaPreguntasService {
	generar(preguntas: Pregunta[], idsDePagina: string[]): Promise<IPreguntaPobladaDto[]>
}