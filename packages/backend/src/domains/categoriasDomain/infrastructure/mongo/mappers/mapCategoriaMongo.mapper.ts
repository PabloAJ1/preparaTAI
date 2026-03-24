import { Categoria as CategoriaEntity } from "../../../../../domains/categoriasDomain/domain/entities/Categoria";
import { ICategoria } from "../interfaces/categoria.interface";

export class MapCategoriaMongo {
	static toModel(categoria: CategoriaEntity): ICategoria {
		return {
			idCategoria: categoria.idCategoria,
			nombreCategoria: categoria.nombreCategoria
		}
	}

	static toEntity(categoria: ICategoria): CategoriaEntity {
		return CategoriaEntity.crear({
			nombreCategoria: categoria.nombreCategoria,
			idCategoria: categoria.idCategoria
		})
	}
}