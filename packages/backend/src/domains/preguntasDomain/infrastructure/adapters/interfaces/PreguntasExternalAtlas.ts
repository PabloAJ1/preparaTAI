import { IPreguntasAtlasDto } from "../dtos/preguntasAtlas.dto";

export interface IPreguntasExternalAtlas {
	getAllPreguntas(): Promise<IPreguntasAtlasDto[]>
}