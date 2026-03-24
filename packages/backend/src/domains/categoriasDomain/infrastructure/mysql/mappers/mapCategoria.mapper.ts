import { Categoria } from "../../../../../domains/categoriasDomain/domain/entities/Categoria";
import { CategoriaModel } from "../models/categoria.model";

export class MapCategoria {
	static toEntityNew(categoriaModel: CategoriaModel): Categoria {
		return Categoria.crear({
			nombreCategoria: categoriaModel.nombreCategoria
		})
	}
}