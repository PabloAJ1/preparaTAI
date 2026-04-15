import { ICategoriaDto } from "../../../application/dtos/categoria.dto";
import { ICategoriaAdapterService } from "../../../application/ports/categoriaAdapterService.interface";
import { IBuscarOCrearCategoriaPorNombre } from "../signatures/buscarOCrearCategoriaPorNombre.interface";
import { ICreateListOfCategorias } from "../signatures/createListOfCategorias.interface";
import { IGetAllCategorias } from "../signatures/getCategorias.interface";
import { IGetCategoriasByIds } from "../signatures/getCategoriasByNames.interface";
import { IGetCategoriasByTipo } from "../signatures/getCategoriasByTipo.interface";
import { IGetListOfCategorias } from "../signatures/getListOfCategorias.interface";

export class CategoriaAdaperServive implements ICategoriaAdapterService {
	constructor(
		private readonly getAllCategoriasPort: IGetAllCategorias,
		private readonly crateListOfCategorias: ICreateListOfCategorias,
		private readonly getListOfCategorias: IGetListOfCategorias,
		private readonly buscarOCrearCategoria: IBuscarOCrearCategoriaPorNombre,
		private readonly getCategoriasByTipo: IGetCategoriasByTipo,
		private readonly getCategoriasByIds: IGetCategoriasByIds
	){}

	async getByIds(idCategorias: string[]): Promise<ICategoriaDto[]> {
		const categoiras = await this.getCategoriasByIds.exec(idCategorias);
		return categoiras
	}
	
	async getAllCategoriasByTipo(tipo: string): Promise<ICategoriaDto[]> {
		const categorias = await this.getCategoriasByTipo.exec(tipo);
		return categorias;
	}

	async crearListadoDeCategoriasPorNombre(categorias: ICategoriaDto[]): Promise<ICategoriaDto[]> {
		const categoriasCreadas = await this.crateListOfCategorias.exec(categorias);
		return categoriasCreadas;
	}

	async getByNombres(categorias: string[]): Promise<ICategoriaDto[]> {
		const categoriasListadas = await this.getListOfCategorias.exec(categorias);
		return categoriasListadas;
	}

	async getAllCategorias(): Promise<ICategoriaDto[]> {
		const categorias = await this.getAllCategoriasPort.exec();
		return categorias;
	}

	async searchAndCreateCategoria(categoriaDto: ICategoriaDto): Promise<ICategoriaDto> {
		const findCategoria = await this.buscarOCrearCategoria.exec(categoriaDto)
		return findCategoria
	}
}