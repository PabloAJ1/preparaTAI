import { IPreguntaExternasDto } from "../dtos/preguntasExternas.dto";

export interface IPreguntasSyncPortService {
	readAllPreguntas(): Promise<IPreguntaExternasDto[]>
}