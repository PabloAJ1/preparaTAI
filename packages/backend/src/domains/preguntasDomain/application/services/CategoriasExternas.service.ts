import { ICategoriaDto } from '../dtos/categoria.dto';
import { IPreguntaMigrationDto } from '../dtos/preguntaMigration.interface';
import { ICategoriaAdapterService } from '../ports/categoriaAdapterService.interface';
import { ICategoriasExternasService } from '../signatures/categoriasExternasService.interface';

export class CategoriasExternasService implements ICategoriasExternasService {
	constructor(private readonly categoriaPort: ICategoriaAdapterService) {}

	async getCategorias(
		preguntasDto: IPreguntaMigrationDto[]
	): Promise<Map<string, ICategoriaDto>> {
		const categoriasExteneras = this.#getCategorias(preguntasDto);

		const categorias = Array.from(categoriasExteneras);
		const existentes = await this.categoriaPort.getByNombres(
			categorias.map(c => c.nombreCategoria)
		);

		const nombresExistentes = new Set(existentes.map((c) => c.nombreCategoria));
		const nuevasCategorias = categorias.filter(
			(c) => !nombresExistentes.has(c.nombreCategoria)
		);

		let categoriasNuevas: ICategoriaDto[] = [];

		if (nuevasCategorias.length > 0) {
			categoriasNuevas =
				await this.categoriaPort.crearListadoDeCategoriasPorNombre(
					nuevasCategorias
				);
		}

		const todas = [...categoriasNuevas, ...existentes];

		return new Map(todas.map((c) => [c.nombreCategoria, c]));
	}

	#getCategorias(preguntasDto: IPreguntaMigrationDto[]) {
		const todasCategorias = preguntasDto.flatMap((p) => p.categorias);

		const categoriasUnicas = new Map<string, ICategoriaDto>();
		for (const cat of todasCategorias) {
			if (!categoriasUnicas.has(cat.nombreCategoria)) {
				categoriasUnicas.set(cat.nombreCategoria, cat);
			}
		}

		return Array.from(categoriasUnicas.values());
	}
}
