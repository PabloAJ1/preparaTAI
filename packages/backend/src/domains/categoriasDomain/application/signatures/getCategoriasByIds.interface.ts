import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IGetCategoriasByIds {
	exec(idsCategorias: string[]): Promise<ICategoriaDto[]>
}