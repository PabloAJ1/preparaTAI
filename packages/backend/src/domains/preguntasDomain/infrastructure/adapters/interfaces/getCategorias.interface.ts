import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IGetAllCategorias {
	exec(): Promise<ICategoriaDto[]>;
}