import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { ICreateListOfCategorias } from "../signatures/createListOfCategorias.interface";

export class CreateListOfCategorias implements ICreateListOfCategorias {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(listaCategorias: ICategoriaDto[]): Promise<ICategoriaDto[]>{
		const listaCategoriasEntities = listaCategorias.map(MapCategoria.toEntity)
		const listaCategoriasEnBD = await this.categoriasRepositories.createListOfCategorias(listaCategoriasEntities)
		return listaCategoriasEnBD.map(MapCategoria.toDto)
	}
}