import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { IGetCategoriasByIds } from "../signatures/getCategoriasByIds.interface";

export class GetCategoriasByIds implements IGetCategoriasByIds {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(idsCategorias: string[]): Promise<ICategoriaDto[]>{
		const listaCategoriasEnBD = await this.categoriasRepositories.getByIds(idsCategorias)
		return listaCategoriasEnBD.map(MapCategoria.toDto)
	}
}