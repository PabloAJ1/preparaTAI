import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IBuscarOCrearCategoria {
	exec(categoria: ICategoriaDto): Promise<ICategoriaDto>
}