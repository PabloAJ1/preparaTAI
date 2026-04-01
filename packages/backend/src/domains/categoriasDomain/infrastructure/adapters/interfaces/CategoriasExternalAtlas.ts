import { ICategoriaAtlasDto } from "../dtos/categoriaAtlas.dto";

export interface ICategoriasExternalAtlas {
	getAllCategorias(): Promise<ICategoriaAtlasDto[]>
}