import { IPreguntaAtlasDto } from "../dtos/preguntasAtlas.dto";

export interface IPreguntasSyncPortService {
	readAllPreguntas(): Promise<IPreguntaAtlasDto>
}