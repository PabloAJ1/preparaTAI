import { IEstadisticasCategoriaDto } from "./estadisticas.dto";

export interface CategoriaResumenDto {
	id: string;
	nombre: string;
	numeroPreguntas: number;
	estadisticas: IEstadisticasCategoriaDto;
}