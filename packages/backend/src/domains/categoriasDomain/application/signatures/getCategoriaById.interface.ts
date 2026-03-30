import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IGetCategoriasById {
	exec(idCategoria: string): Promise<ICategoriaDto>
}