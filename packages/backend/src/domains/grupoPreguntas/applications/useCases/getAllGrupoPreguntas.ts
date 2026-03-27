import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";
import { IGetAllGrupoPreguntas } from "../signatures/getAllGrupoPreguntas.interface";

export class GetAllGrupoPreguntas implements IGetAllGrupoPreguntas {
	exec(): IGrupoPreguntasDto{
		throw new Error("No implementado")	
	}
}