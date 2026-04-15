import { IPreguntaPobladaDto } from "../dtos/preguntaPoblada.dto";

export interface IGetPreguntasPorCateogiraConSession {
	exec(idCategoria: string, page?: number, limit?: number, seed?: number): Promise<IPreguntaPobladaDto[]>
}