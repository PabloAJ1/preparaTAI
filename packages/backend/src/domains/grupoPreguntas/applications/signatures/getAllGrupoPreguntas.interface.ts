import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";

export interface IGetAllGrupoPreguntas {
	exec(): IGrupoPreguntasDto;
}