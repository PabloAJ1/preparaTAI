import { EstadisticasPorCategoria } from "../preguntasDomain/application/useCases/estadisticasPorCategoria";
import { PreguntaRespositoryMongoDB } from "../preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository";
import { GetCategoriasById } from "./application/useCases/getCategoriaById";
import { GetCategoriasByTipo } from "./application/useCases/getCategoriasResumen";
import { PreguntaAdapterPort } from "./infrastructure/adapters/ports/preguntaAdapter.service";
import { CategoriaRepositoryMongo } from "./infrastructure/mongo/repositories/categoriaRepositoryMongo.repository";

export const categoriaBuilder = () => {
	const categoriaRepositoryMongo = new CategoriaRepositoryMongo();

	const preguntaRespositoryMongoDB = new PreguntaRespositoryMongoDB();
	const getEstadisticasPorCategoria = new EstadisticasPorCategoria(preguntaRespositoryMongoDB);
	const preguntaAdapterPort = new PreguntaAdapterPort(getEstadisticasPorCategoria)

	const getCategoriaResumen = new GetCategoriasByTipo(
		categoriaRepositoryMongo,
		preguntaAdapterPort
	)

	const getCategoriaById = new GetCategoriasById(categoriaRepositoryMongo)

	return {
		getCategoriaResumen,
		getCategoriaById
	}
}