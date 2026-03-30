import { Categoria } from "../entities/Categoria";
import { ETipoCategoria } from "../enums/tipoCategoria.enum";

export interface ICategoriaRepository {
	createCategoria(categoria: Categoria): Promise<Categoria>;
	getAllCategorias(): Promise<Categoria[]>
	getCategoriasByType(tipo: ETipoCategoria): Promise<Categoria[]>
	getCategoriasById(idCategoria: string): Promise<Categoria>
	getAllCategoriasNoCuestionarios(): Promise<Categoria[]>
	getAllCategoriasCuestionarios(): Promise<Categoria[]>
	getAllCategoriasExamenes(): Promise<Categoria[]>
	getListOfCategorias(listaCategorias: string[]): Promise<Categoria[]>
	createListOfCategorias(listaCategorias: Categoria[]): Promise<Categoria[]>
}