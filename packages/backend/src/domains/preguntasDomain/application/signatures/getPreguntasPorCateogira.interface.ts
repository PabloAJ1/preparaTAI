import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IGetPreguntasPorCateogira {
	exec(idCategoria: string): Promise<IPreguntaDto[]>
}