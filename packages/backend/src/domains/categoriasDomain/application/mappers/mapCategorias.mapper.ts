import { Categoria } from "../../domain/entities/Categoria";
import { ICategoriaDto } from "../dtos/categoria.dto";

export class MapCateogira {
	static toDto(categoria: Categoria): ICategoriaDto {
		return {
			idCategoria: categoria.idCategoria,
			nombreCategoria: categoria.nombreCategoria,
			tipo: categoria.tipoCategoriaString
		}
	}
}