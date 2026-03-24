import { ICategoriaDto } from "../dtos/categoria.dto";
import { IPreguntaDto } from "../dtos/pregunta.dto";

export interface ICategoriasExternasService {
	getCategorias(categorias: IPreguntaDto[]): Promise<Map<string, ICategoriaDto>>
}