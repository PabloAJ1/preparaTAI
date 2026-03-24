import { ICategoriaDto } from "../dtos/categoria.dto";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { ICategoriaAdapterService } from "../ports/categoriaAdapterService.interface";
import { ICategoriasExternasService } from "../signatures/categoriasExternasService.interface";

export class CategoriasExternasService implements ICategoriasExternasService {
	constructor(
		private readonly categoriaPort: ICategoriaAdapterService
	){}

	async getCategorias(preguntasDto: IPreguntaDto[]): Promise<Map<string, ICategoriaDto>> {
		const categoriasExteneras = this.#getCategorias(preguntasDto)
		const categorias = Array.from(categoriasExteneras);
		const existentes = await this.categoriaPort.obtenerCategoriasPorNombre(categorias);
		const nombresExistentes = new Set(existentes.map(c => c.nombreCategoria));
		const nuevasCategorias = categorias.filter(
			c => !nombresExistentes.has(c)
		);

		let categoriasNuevas: ICategoriaDto[] = [];

		if (nuevasCategorias.length > 0) {
			categoriasNuevas =await this.categoriaPort.crearListadoDeCategoriasPorNombre(nuevasCategorias);
		}

		const todas = [
			...categoriasNuevas,
			...existentes
		];

		return new Map(
			todas.map(c => [c.nombreCategoria, c])
		);
	}

	#getCategorias(preguntasDto: IPreguntaDto[]) {
		return new Set(
			preguntasDto.flatMap(p => p.categorias)
		);
	}
}