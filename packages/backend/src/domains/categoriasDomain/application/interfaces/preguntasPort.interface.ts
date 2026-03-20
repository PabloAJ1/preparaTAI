import { Categoria } from "../../domain/entities/Categoria";

export interface IPreguntasPort {
	getNumeroPreguntasPorCategoria(categoria: Categoria): Promise<number>;
}