import { Categoria } from '../../../../../domains/categoriasDomain/domain/entities/Categoria';
import { ETipoCategoria } from '../../../domain/enums/tipoCategoria.enum';
import { CategoriaModel } from '../models/categoria.model';

export class MapCategoria {
	static toEntityNew(categoriaModel: CategoriaModel, practica = false): Categoria {

		let tipo: ETipoCategoria;

		if (categoriaModel.nombreCategoria.toLocaleLowerCase().includes('cuestionario')) {
			tipo = ETipoCategoria.EXAMEN;
		} else if (practica) {
			tipo = ETipoCategoria.PRACTICA;
		} else {
			tipo = ETipoCategoria.DEFAULT;
		}

		return Categoria.crear({
			nombreCategoria: categoriaModel.nombreCategoria,
			tipo,
		});
	}
}