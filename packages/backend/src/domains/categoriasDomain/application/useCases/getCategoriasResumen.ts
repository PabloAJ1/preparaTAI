import { ETipoCategoria } from '../../domain/enums/tipoCategoria.enum';
import { ICategoriaRepository } from '../../domain/repositories/categoriaRepository.interface';
import { CategoriaResumenDto } from '../dtos/categoriasResumen.dto';
import { IPreguntasPort } from '../interfaces/preguntasPort.interface';
import { MapCateogiraResumen } from '../mappers/mapCategoriasResumen.mapper';
import { IGetCategoriasByTipo } from '../signatures/getCategoriasResumen.interface';

export class GetCategoriasByTipo implements IGetCategoriasByTipo {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
		private readonly preguntasPort: IPreguntasPort
	) {}

	async exec(tipoCategoria: 'CUESTIONARIO' | 'NORMAL' | 'EXAMEN' = 'NORMAL'): Promise<CategoriaResumenDto[]> {
		const result = await this.categoriasRepositories.getCategoriasByType(this.#tipoStringToEnum(tipoCategoria));
		const returnResult: CategoriaResumenDto[] = [];

		for (const categoria of result) {
			const numeroPreguntas =
				await this.preguntasPort.getNumeroPreguntasPorCategoria(categoria);
			returnResult.push(MapCateogiraResumen.toDto(categoria, numeroPreguntas));
		}

		return returnResult;
	}

	#tipoStringToEnum(
		tipo: 'CUESTIONARIO' | 'NORMAL' | 'EXAMEN'
	): ETipoCategoria {
		if (tipo === 'NORMAL')
			return ETipoCategoria.DEFAULT
		else if (tipo === 'CUESTIONARIO')
			return ETipoCategoria.CUESTIONARIO
		else return ETipoCategoria.EXAMEN
	}
}
