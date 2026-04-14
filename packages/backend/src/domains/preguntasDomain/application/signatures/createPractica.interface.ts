import { IPracticaCreateDto } from "../dtos/practicaCreate.dto";

export interface ICreatePractica {
	exec(practicaNueva: IPracticaCreateDto): Promise<void>
}