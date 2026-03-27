import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";
import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";
import { ICreateGrupoPreguntas } from "../signatures/createGrupoPreguntas.interface";

export class CreateGrupoPreguntas implements ICreateGrupoPreguntas {
	exec(grupoPreguntasPoblada: IGrupoPreguntasPobladaDto): IGrupoPreguntasDto {
		throw new Error("No implementado")	
	}
}