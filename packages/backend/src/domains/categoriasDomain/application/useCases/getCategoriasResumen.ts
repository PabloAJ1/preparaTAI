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

	async exec(
		tipoCategoria:
			| 'PRACTICA'
			| 'NORMAL'
			| 'EXAMEN'
			| 'GRUPOPREGUNTAS' = 'NORMAL'
	): Promise<CategoriaResumenDto[]> {
		const result = await this.categoriasRepositories.getCategoriasByType(
			this.#tipoStringToEnum(tipoCategoria)
		);

		const returnResult: CategoriaResumenDto[] = [];
		for (const categoria of result) {
			const estadisticas =
				await this.preguntasPort.getNumeroPreguntasPorCategoria(categoria);

			if (estadisticas.numeroPreguntas > 0)
				returnResult.push(MapCateogiraResumen.toDto(categoria, estadisticas));
		}
		return returnResult;
	}

	#tipoStringToEnum(
		tipo: 'PRACTICA' | 'NORMAL' | 'EXAMEN' | 'GRUPOPREGUNTAS'
	): ETipoCategoria {
		if (tipo === 'NORMAL') return ETipoCategoria.DEFAULT;
		else if (tipo === 'PRACTICA') return ETipoCategoria.PRACTICA;
		else if (tipo === 'GRUPOPREGUNTAS') return ETipoCategoria.GRUPOPREGUNTAS;
		else return ETipoCategoria.EXAMEN;
	}
}
