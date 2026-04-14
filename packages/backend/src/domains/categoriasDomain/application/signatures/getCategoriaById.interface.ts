import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IGetCategoriaById {
	exec(idCategoria: string): Promise<ICategoriaDto>
}