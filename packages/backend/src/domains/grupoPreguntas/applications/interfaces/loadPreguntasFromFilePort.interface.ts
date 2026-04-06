import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";

export interface ILoadPreguntasFromFilePort {
	loadFile(): Promise<IGrupoPreguntasPobladaDto[]>
}