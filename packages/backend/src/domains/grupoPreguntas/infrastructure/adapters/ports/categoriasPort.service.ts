import { ICategoriaPort } from "../../../applications/interfaces/categoriasPort.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { IBuscarOCrearCategoriaPorNombre } from "../signatures/buscarOCrearCategoriaPorNombre.interface";

export class CategoriaPortService implements ICategoriaPort {
	constructor(
		private readonly buscarOCrearCategoria: IBuscarOCrearCategoriaPorNombre
	){}

	async getIdCategoriaByName(nombreCateogira: string): Promise<string> {
		const cat: ICategoriaDto = {
			idCategoria: 'desconocido',
			nombreCategoria: `GRUPO-${nombreCateogira}`,
			tipo: 'GRUPOPREGUNTAS'
		}
		return (await this.buscarOCrearCategoria.exec(cat)).idCategoria
	}

}