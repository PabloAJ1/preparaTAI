import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCateogira } from "../mappers/mapCategorias.mapper";
import { IGetAllCategorias } from "../signatures/getAllCategorias.interface";

export class GetAllCategorias implements IGetAllCategorias {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(): Promise<ICategoriaDto[]> {
		const result = await this.categoriasRepositories.getAllCategorias();
		return result.map(MapCateogira.toDto)
	}
}