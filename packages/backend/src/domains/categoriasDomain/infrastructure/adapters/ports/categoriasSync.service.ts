import { ICategoriaDto } from "../../../application/dtos/categoria.dto";
import { ICategoriasSyncPort } from "../../../application/interfaces/categoriasSyncPort.interface";
import { ICategoriasExternalAtlas } from "../interfaces/CategoriasExternalAtlas";

export class CategoriasSyncService implements ICategoriasSyncPort {
	constructor(
		private readonly getCategoriasFromAtlas: ICategoriasExternalAtlas
	){}

	async readAllCategorias(): Promise<ICategoriaDto[]> {
		const allCategorias = await this.getCategoriasFromAtlas.getAllCategorias();
		return allCategorias;
	}	
}