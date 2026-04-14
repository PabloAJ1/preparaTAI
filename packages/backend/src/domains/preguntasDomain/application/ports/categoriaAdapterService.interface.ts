import { ICategoriaDto } from "../dtos/categoria.dto";

export interface ICategoriaAdapterService {
	getAllCategorias(): Promise<ICategoriaDto[]>
	getAllCategoriasByTipo(tipo: string): Promise<ICategoriaDto[]>
	crearListadoDeCategoriasPorNombre(categorias: ICategoriaDto[]): Promise<ICategoriaDto[]>
	obtenerCategoriasPorNombre(categorias: string[]): Promise<ICategoriaDto[]>
	searchAndCreateCategoria(categoriaDto: ICategoriaDto): Promise<ICategoriaDto>
}