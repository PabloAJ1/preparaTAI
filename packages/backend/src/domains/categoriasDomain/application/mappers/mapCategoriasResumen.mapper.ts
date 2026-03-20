import { Categoria } from "../../domain/entities/Categoria";
import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";

export class MapCateogiraResumen {
	static toDto(categoria: Categoria, numeroPreguntas: number): CategoriaResumenDto {
		return {
			id: categoria.idCategoria,
			nombre: categoria.nombreCategoria,
			numeroPreguntas: numeroPreguntas
		}
	}
}