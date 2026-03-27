import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";
import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";

export interface ICreateGrupoPreguntas {
	exec(grupoPreguntasPonñada: IGrupoPreguntasPobladaDto): IGrupoPreguntasDto;
}