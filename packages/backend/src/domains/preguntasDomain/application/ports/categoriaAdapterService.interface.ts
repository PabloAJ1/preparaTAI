import { ICategoriaDto } from "../dtos/categoria.dto";

export interface ICategoriaAdapterService {
	getAllCategorias(): Promise<ICategoriaDto[]>
	crearListadoDeCategoriasPorNombre(categorias: string[]): Promise<ICategoriaDto[]>
	obtenerCategoriasPorNombre(categorias: string[]): Promise<ICategoriaDto[]>
}