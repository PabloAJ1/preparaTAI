import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";

export interface LoadPreguntasFromFilePort {
	loadFile(): Promise<IGrupoPreguntasPobladaDto[]>
}