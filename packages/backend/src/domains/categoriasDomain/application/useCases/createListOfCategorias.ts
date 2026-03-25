import { Categoria } from "../../domain/entities/Categoria";
import { ETipoCategoria } from "../../domain/enums/tipoCategoria.enum";
import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { MapCateogira } from "../mappers/mapCategorias.mapper";
import { ICreateListOfCategorias } from "../signatures/createListOfCategorias.interface";

export class CreateListOfCategorias implements ICreateListOfCategorias {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(listaCategorias: string[]): Promise<ICategoriaDto[]>{
		const listaCategoriasEntities = listaCategorias.map(c => {
			return Categoria.crear({
				nombreCategoria: c,
				tipo: this.#toEnumTipo(c)
			})
		})

		const listaCategoriasEnBD = await this.categoriasRepositories.createListOfCategorias(listaCategoriasEntities)
		return listaCategoriasEnBD.map(MapCateogira.toDto)
	}

	#toEnumTipo(nombreCategoria: string): ETipoCategoria {
		if(nombreCategoria.toLocaleLowerCase().includes("examen")){
			return ETipoCategoria.EXAMEN;
		} else if(nombreCategoria.toLocaleLowerCase().includes("cuestionario")){
				return ETipoCategoria.CUESTIONARIO
		} else {
				return ETipoCategoria.DEFAULT
		}
	}
}