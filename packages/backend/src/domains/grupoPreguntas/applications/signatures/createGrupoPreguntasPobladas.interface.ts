import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";
import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";

export interface ICreateGrupoPreguntasPobladas {
	exec(grupoPreguntasPonñada: IGrupoPreguntasPobladaDto):  Promise<IGrupoPreguntasDto>;
}