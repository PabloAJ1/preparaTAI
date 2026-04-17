import { IListaPreguntasPobladasDto } from "../dtos/listaPreguntasPobladas.dto";

export interface IGetPreguntasPorCateogiraConSession {
	exec(idCategoria: string, page?: number, limit?: number, seed?: number): Promise<IListaPreguntasPobladasDto>
}