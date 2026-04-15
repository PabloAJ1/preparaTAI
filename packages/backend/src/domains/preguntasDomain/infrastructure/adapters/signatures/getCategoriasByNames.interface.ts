import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IGetCategoriasByIds {
	exec(nombreCategorias: string[]): Promise<ICategoriaDto[]>
}