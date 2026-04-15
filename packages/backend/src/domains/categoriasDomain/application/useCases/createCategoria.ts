import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { ICreateCategoria } from "../signatures/createCategoria.interface";

export class CreateCategoria implements ICreateCategoria {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(categoria: ICategoriaDto): Promise<ICategoriaDto>{
		const categoriaEntity = MapCategoria.toEntity(categoria);
		const categoriaSaved = await this.categoriasRepositories.createCategoria(categoriaEntity)
		return MapCategoria.toDto(categoriaSaved)
	}
}