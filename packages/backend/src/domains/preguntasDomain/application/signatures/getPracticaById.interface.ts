import { IPracticaPobladaDto } from "../dtos/practicaPoblada.dto";

export interface IGetPreguntasPractica {
	exec(
		idPractica: string,
		page?: number, 
		limit?: number,
		seed?: number
	): Promise<IPracticaPobladaDto>
}