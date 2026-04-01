import { ICategoriaDto } from "../../../application/dtos/categoria.dto";
import { ICategoriaAdapterService } from "../../../application/ports/categoriaAdapterService.interface";
import { ICreateListOfCategorias } from "../signatures/createListOfCategorias.interface";
import { IGetAllCategorias } from "../signatures/getCategorias.interface";
import { IGetListOfCategorias } from "../signatures/getListOfCategorias.interface";

export class CategoriaAdaperServive implements ICategoriaAdapterService {
	constructor(
		private readonly getAllCategoriasPort: IGetAllCategorias,
		private readonly crateListOfCategorias: ICreateListOfCategorias,
		private readonly getListOfCategorias: IGetListOfCategorias,
	){}

	async crearListadoDeCategoriasPorNombre(categorias: ICategoriaDto[]): Promise<ICategoriaDto[]> {
		const categoriasCreadas = await this.crateListOfCategorias.exec(categorias);
		return categoriasCreadas;
	}

	async obtenerCategoriasPorNombre(categorias: string[]): Promise<ICategoriaDto[]> {
		const categoriasListadas = await this.getListOfCategorias.exec(categorias);
		return categoriasListadas;
	}

	async getAllCategorias(): Promise<ICategoriaDto[]> {
		const categorias = await this.getAllCategoriasPort.exec();
		return categorias;
	}
}