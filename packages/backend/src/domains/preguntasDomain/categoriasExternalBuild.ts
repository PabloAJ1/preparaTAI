import { BuscarOCrearCategoria } from "../categoriasDomain/application/useCases/buscarOCrearCategoria";
import { CreateListOfCategorias } from "../categoriasDomain/application/useCases/createListOfCategorias";
import { GetAllCategorias } from "../categoriasDomain/application/useCases/getAllCategorias";
import { GetCategoriasByIds } from "../categoriasDomain/application/useCases/getCategoriasByIds";
import { GetCategoriasByTipo } from "../categoriasDomain/application/useCases/getCategoriasByTipo.interface";
import { GetListOfCategorias } from "../categoriasDomain/application/useCases/getListOfCategorias";
import { CategoriaRepositoryMongo } from "../categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository";
import { CategoriaAdaperServive } from "./infrastructure/adapters/ports/categoriasAdapter.service";

export const categoriasExternalBuild = () => {
	const categoriaMongoDBRepository = new CategoriaRepositoryMongo();
	const buscarOCrearCategoria = new BuscarOCrearCategoria(categoriaMongoDBRepository)
	const getCategoriasByTipo = new GetCategoriasByTipo(categoriaMongoDBRepository)
	const getAllCategoriasPort = new GetAllCategorias(categoriaMongoDBRepository);
	const getCategoriasByIds = new GetCategoriasByIds(categoriaMongoDBRepository);
	const crateListOfCategorias = new CreateListOfCategorias(
		categoriaMongoDBRepository
	);
	const getListOfCategorias = new GetListOfCategorias(
		categoriaMongoDBRepository
	);

	const categoriaAdapertService = new CategoriaAdaperServive(
		getAllCategoriasPort,
		crateListOfCategorias,
		getListOfCategorias,
		buscarOCrearCategoria,
		getCategoriasByTipo,
		getCategoriasByIds
	);

	return {
		categoriaAdapertService
	}
}