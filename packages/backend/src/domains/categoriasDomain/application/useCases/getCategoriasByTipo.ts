import { TipoCategortiaHelper } from "../../domain/helpers/tipoCategoria.helper";
import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { IGetCategoriasByTipo } from "../signatures/getCategoriasByTipo.interface";

export class GetCategoriasByTipo implements IGetCategoriasByTipo {
	constructor(
			private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(tipoCategoria: string): Promise<ICategoriaDto[]> {
		const tipo = TipoCategortiaHelper.fromString(tipoCategoria)
		const categoria = await this.categoriasRepositories.getCategoriasByType(tipo);
		return categoria.map(MapCategoria.toDto)
	}
}