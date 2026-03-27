import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";

export interface IGetGrupoPreguntasByIdD {
	exec(idGrupo: string): Promise<IGrupoPreguntasPobladaDto>;
}