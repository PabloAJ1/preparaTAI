import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IGetPreguntasPorCateogiraConPaginacion {
	exec(idCategoria: string, page?: number, limit?: number): Promise<IPreguntaDto[]>
}