import { IPreguntaDto } from "./pregunta.dto";

export interface IPracticaPobladaDto {
	idPractica: string;
	nombrePractica: string;
	preguntas: IPreguntaDto[]
}