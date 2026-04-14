import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { IGetCategoriaById } from "../signatures/getCategoriaById.interface";

export class GetCategoriasById implements IGetCategoriaById {
	constructor(
			private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(idCategoria: string): Promise<ICategoriaDto> {
		const categoria = await this.categoriasRepositories.getCategoriasById(idCategoria);
		return MapCategoria.toDto(categoria)
	}

}