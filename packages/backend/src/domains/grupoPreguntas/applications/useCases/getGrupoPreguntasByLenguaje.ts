import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";
import { IGetGrupoPreguntasByLenguaje } from "../signatures/getGrupoPreguntasByLenguaje.interface";

export class GetGrupoPreguntasByLenguaje implements IGetGrupoPreguntasByLenguaje {
	exec(lenguaje: string): IGrupoPreguntasDto{
		throw new Error("No implementado")	
	}
}