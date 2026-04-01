import { ICategoriaDto } from "../dtos/categoria.dto";

export interface ICreateListOfCategorias {
	exec(listaCategorias: ICategoriaDto[]): Promise<ICategoriaDto[]>;
}