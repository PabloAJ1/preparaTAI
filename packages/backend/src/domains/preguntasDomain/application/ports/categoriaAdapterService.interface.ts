import { ICategoriaDto } from "../dtos/categoria.dto";

export interface ICategoriaAdapterService {
	getAllCategorias(): Promise<ICategoriaDto[]>
	getAllCategoriasByTipo(tipo: string): Promise<ICategoriaDto[]>
	crearListadoDeCategoriasPorNombre(categorias: ICategoriaDto[]): Promise<ICategoriaDto[]>
	getByNombres(categorias: string[]): Promise<ICategoriaDto[]>
	getByIds(idCategorias: string[]): Promise<ICategoriaDto[]>
	searchAndCreateCategoria(categoriaDto: ICategoriaDto): Promise<ICategoriaDto>
}