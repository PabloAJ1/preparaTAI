import { ICategoriaDto } from "./categoria.dto";
import { IPreguntaDtoBase } from "./pregunta.dto";

export interface IPreguntaPobladaDto extends IPreguntaDtoBase {
	categorias?: ICategoriaDto[]
}