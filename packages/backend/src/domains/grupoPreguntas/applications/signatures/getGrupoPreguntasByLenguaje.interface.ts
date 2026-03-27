import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";

export interface IGetGrupoPreguntasByLenguaje {
	exec(lenguaje: string): IGrupoPreguntasDto;
}