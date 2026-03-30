import { ICategoriaDto } from "../dtos/categoria.dto";
import { IPreguntaMigrationDto } from "../dtos/preguntaMigration.interface";

export interface ICategoriasExternasService {
	getCategorias(categorias: IPreguntaMigrationDto[]): Promise<Map<string, ICategoriaDto>>
}