import { ICategoriaDto } from "../dtos/categoria.dto";

export interface IGetCategoriasByTipo {
	exec(tipoCategoria: string): Promise<ICategoriaDto[]>
}