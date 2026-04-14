import { IEstadosticasDto } from "./estadisticas.dto";

export interface PracticasConEstadisticas {
	nombrePractica: string;
	idPractica: string;
	numeroDePreguntas: number;
	estadisticas: IEstadosticasDto
}