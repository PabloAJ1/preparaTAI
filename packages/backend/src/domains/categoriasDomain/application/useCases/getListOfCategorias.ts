import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { IGetListOfCategorias } from "../signatures/getListOfCategorias.interface";

export class GetListOfCategorias implements IGetListOfCategorias {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(listaCategorias: string[]): Promise<ICategoriaDto[]>{
		const listaCategoriasEnBD = await this.categoriasRepositories.getListOfCategorias(listaCategorias)
		return listaCategoriasEnBD.map(MapCategoria.toDto)
	}
}