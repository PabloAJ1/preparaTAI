import { ICategoriaDto } from "../dtos/categoria.dto";

export interface ICreateCategoria {
	exec(categoria: ICategoriaDto): Promise<ICategoriaDto>
}