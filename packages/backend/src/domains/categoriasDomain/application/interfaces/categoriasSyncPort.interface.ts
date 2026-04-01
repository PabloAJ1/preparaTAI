import { ICategoriaDto } from "../dtos/categoria.dto";

export interface ICategoriasSyncPort {
	readAllCategorias(): Promise<ICategoriaDto[]>
}