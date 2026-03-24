import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IGetListOfCategorias {
	exec(listaCategorias: string[]): Promise<ICategoriaDto[]>;
}