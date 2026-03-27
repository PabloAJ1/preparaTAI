import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IBuscarOCrearCategoriaPorNombre {
	exec(nombreCategoria: ICategoriaDto): Promise<ICategoriaDto>
}