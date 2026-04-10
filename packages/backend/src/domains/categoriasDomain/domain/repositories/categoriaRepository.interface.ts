import { Categoria } from "../entities/Categoria";
import { ETipoCategoria } from "../enums/tipoCategoria.enum";

export interface ICategoriaRepository {
	createCategoria(categoria: Categoria): Promise<Categoria>;
	createBulkPreguntas(categoria: Categoria[]): Promise<void>;
	getAllCategorias(): Promise<Categoria[]>
	getCategoriasByType(tipo: ETipoCategoria): Promise<Categoria[]>
	getCategoriasByName(nombreCategoria: string): Promise<Categoria>
	getCategoriasById(idCategoria: string): Promise<Categoria>
	getAllCategoriasNoCuestionarios(): Promise<Categoria[]>
	getAllCategoriasCuestionarios(): Promise<Categoria[]>
	getAllCategoriasExamenes(): Promise<Categoria[]>
	getListOfCategorias(listaCategorias: string[]): Promise<Categoria[]>
	createListOfCategorias(listaCategorias: Categoria[]): Promise<Categoria[]>
}