import { Categoria } from "../entities/Categoria";

export interface ICategoriaRepository {
	createCategoria(categoria: Categoria): Promise<Categoria>;
	getAllCategorias(): Promise<Categoria[]>
	getAllCategoriasNoCuestionarios(): Promise<Categoria[]>
	getAllCategoriasCuestionarios(): Promise<Categoria[]>
	getAllCategoriasExamenes(): Promise<Categoria[]>
	getListOfCategorias(listaCategorias: string[]): Promise<Categoria[]>
	createListOfCategorias(listaCategorias: Categoria[]): Promise<Categoria[]>
}