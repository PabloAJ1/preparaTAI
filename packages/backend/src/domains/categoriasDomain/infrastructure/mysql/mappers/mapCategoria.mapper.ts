import { Categoria } from '../../../../../domains/categoriasDomain/domain/entities/Categoria';
import { ETipoCategoria } from '../../../domain/enums/tipoCategoria.enum';
import { CategoriaModel } from '../models/categoria.model';

export class MapCategoria {
	static toEntityNew(categoriaModel: CategoriaModel): Categoria {
		return Categoria.crear({
			nombreCategoria: categoriaModel.nombreCategoria,
			tipo: categoriaModel.nombreCategoria
				.toLocaleLowerCase()
				.includes('cuestionario')
				? ETipoCategoria.CUESTIONARIO
				: ETipoCategoria.DEFAULT,
		});
	}
}
