import { IPreguntaPobladaDto } from "./preguntaPoblada.dto";

export interface IPracticaPobladaDto {
	idPractica: string;
	nombrePractica: string;
	preguntas: IPreguntaPobladaDto[]
}