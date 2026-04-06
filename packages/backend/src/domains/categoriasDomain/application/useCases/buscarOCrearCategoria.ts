import { Categoria } from "../../domain/entities/Categoria";
import { TipoCategortiaHelper } from "../../domain/helpers/tipoCategoria.helper";
import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { CategoriaNoEncontradaByNombre } from "../errors/CategoriaNoEncontradaByNombre.error";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { IBuscarOCrearCategoria } from "../signatures/buscarOCrearCategoria.interface";

export class BuscarOCrearCategoria implements IBuscarOCrearCategoria {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(categoriaDto: ICategoriaDto): Promise<ICategoriaDto> {
		try{
			const categoria = await this.categoriasRepositories.getCategoriasByName(categoriaDto.nombreCategoria);
			return MapCategoria.toDto(categoria);
		}catch(err){
			if(err instanceof CategoriaNoEncontradaByNombre){
				const categoriaNueva = Categoria.crear({ 
					nombreCategoria: categoriaDto.nombreCategoria, 
					tipo: TipoCategortiaHelper.fromString(categoriaDto.tipo) 
				});
				const categoriaSaved = await this.categoriasRepositories.createCategoria(categoriaNueva)

				return MapCategoria.toDto(categoriaSaved);
			} else {
				throw err;
			}
		}
	}
}