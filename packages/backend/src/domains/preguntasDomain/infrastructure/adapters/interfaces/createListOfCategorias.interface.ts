import { ICategoriaDto } from "../dtos/categoria.dto";

export interface ICreateListOfCategorias {
	exec(listaCategorias: string[]): Promise<ICategoriaDto[]>;
}