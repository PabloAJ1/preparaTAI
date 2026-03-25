import { GetNumeroPreguntasPorCategoria } from "../preguntasDomain/application/useCases/getNumeroPreguntasPorCategoria";
import { PreguntaRespositoryMongoDB } from "../preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository";
import { GetCategoriasByTipo } from "./application/useCases/getCategoriasResumen";
import { PreguntaAdapterPort } from "./infrastructure/adapters/ports/preguntaAdapterPort";
import { CategoriaRepositoryMongo } from "./infrastructure/mongo/repositories/categoriaRepositoryMongo.repository";

export const categoriaBuilder = () => {
	const categoriaRepositoryMongo = new CategoriaRepositoryMongo();

	const preguntaRespositoryMongoDB = new PreguntaRespositoryMongoDB();
	const getNumeroPreguntasPorCategoria = new GetNumeroPreguntasPorCategoria(preguntaRespositoryMongoDB);
	const preguntaAdapterPort = new PreguntaAdapterPort(getNumeroPreguntasPorCategoria)

	const getCategoriaResumen = new GetCategoriasByTipo(
		categoriaRepositoryMongo,
		preguntaAdapterPort
	)

	return {
		getCategoriaResumen
	}
}