import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface IExternalDataService {
	cargarDatos(path: string): Promise<IPreguntaDto[]>
}