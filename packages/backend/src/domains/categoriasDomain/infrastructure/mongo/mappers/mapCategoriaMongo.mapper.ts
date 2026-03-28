import { Categoria as CategoriaEntity } from "../../../../../domains/categoriasDomain/domain/entities/Categoria";
import { ETipoCategoria } from "../../../domain/enums/tipoCategoria.enum";
import { ICategoria } from "../interfaces/categoria.interface";

export class MapCategoriaMongo {
	static toModel(categoria: CategoriaEntity): ICategoria {
		return {
			idCategoria: categoria.idCategoria,
			nombreCategoria: categoria.nombreCategoria,
			tipo: categoria.tipoCategoriaString
		}
	}

	static toEntity(categoria: ICategoria): CategoriaEntity {
		return CategoriaEntity.crear({
			nombreCategoria: categoria.nombreCategoria,
			idCategoria: categoria.idCategoria,
			tipo : MapCategoriaMongo.#toEnum(categoria.tipo)
		})
	}

	static #toEnum(tipo: string): ETipoCategoria{
		switch(tipo.toLocaleLowerCase()){
			case "examen":
			case "cuestionario":
				return ETipoCategoria.EXAMEN
			case "practica":
				return ETipoCategoria.PRACTICA
			default:
				return ETipoCategoria.DEFAULT
		}
	}
}