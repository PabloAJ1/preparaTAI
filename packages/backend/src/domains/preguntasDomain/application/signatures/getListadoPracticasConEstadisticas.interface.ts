import { PracticasConEstadisticas } from "../dtos/practicasConEstadisticas.dto";

export interface IGetListadoPracticasConEstadisticas {
	exec(): Promise<PracticasConEstadisticas[]>
}