import { EstadisticasPorCategoria } from "../preguntasDomain/application/useCases/estadisticasPorCategoria";
import { PreguntaRespositoryMongoDB } from "../preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository";
import { GetAllCategorias } from "./application/useCases/getAllCategorias";
import { GetCategoriasById } from "./application/useCases/getCategoriaById";
import { GetCategoriasByTipoResumen } from "./application/useCases/getCategoriasResumen";
import { PreguntaAdapterPort } from "./infrastructure/adapters/ports/preguntaAdapter.service";
import { CategoriaRepositoryMongo } from "./infrastructure/mongo/repositories/categoriaRepositoryMongo.repository";

export const categoriaBuilder = () => {
	const categoriaRepositoryMongo = new CategoriaRepositoryMongo();

	const preguntaRespositoryMongoDB = new PreguntaRespositoryMongoDB();
	const getEstadisticasPorCategoria = new EstadisticasPorCategoria(preguntaRespositoryMongoDB);
	const preguntaAdapterPort = new PreguntaAdapterPort(getEstadisticasPorCategoria)

	const getCategoriaResumen = new GetCategoriasByTipoResumen(
		categoriaRepositoryMongo,
		preguntaAdapterPort
	)

	const getCategoriaById = new GetCategoriasById(categoriaRepositoryMongo)
	const getAllCategorias = new GetAllCategorias(categoriaRepositoryMongo)

	return {
		categorias: {
			getAll: getAllCategorias,
			getResumen: getCategoriaResumen,
			getById: getCategoriaById
		}
	}
}