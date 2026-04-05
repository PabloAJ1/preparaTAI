import { Categoria } from "../../domain/entities/Categoria";
import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";
import { IEstadisticasCategoriaDto } from "../dtos/estadisticas.dto";

export class MapCateogiraResumen {
	static toDto(categoria: Categoria, estadisticas: IEstadisticasCategoriaDto): CategoriaResumenDto {
		return {
			id: categoria.idCategoria,
			nombre: categoria.nombreCategoria,
			numeroPreguntas: estadisticas.numeroPreguntas,
			estadisticas: estadisticas
		}
	}
}