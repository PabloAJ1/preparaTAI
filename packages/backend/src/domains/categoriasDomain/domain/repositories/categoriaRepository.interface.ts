import { Categoria } from "../entities/Categoria";

export interface ICategoriaRepository {
	getAllCategorias(): Promise<Categoria[]>
	getAllCategoriasNoCuestionarios(): Promise<Categoria[]>
	getAllCategoriasCuestionarios(): Promise<Categoria[]>
}