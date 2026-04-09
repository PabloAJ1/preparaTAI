import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";

export interface IGetGrupoPreguntasByIdCategoria {
	exec(idCategoria: string): Promise<IGrupoPreguntasPobladaDto[]>;
}