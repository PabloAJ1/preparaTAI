import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";

export interface ICreateGrupoPreguntas {
	exec(grupoPreguntasPonñada: IGrupoPreguntasDto): Promise<IGrupoPreguntasDto>;
}