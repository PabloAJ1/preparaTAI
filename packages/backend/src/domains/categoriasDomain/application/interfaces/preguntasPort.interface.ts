import { Categoria } from "../../domain/entities/Categoria";
import { IEstadisticasCategoriaDto } from "../dtos/estadisticas.dto";

export interface IPreguntasPort {
	getNumeroPreguntasPorCategoria(categoria: Categoria): Promise<IEstadisticasCategoriaDto>;
}