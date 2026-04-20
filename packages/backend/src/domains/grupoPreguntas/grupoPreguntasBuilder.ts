import { BuscarOCrearCategoria } from "../categoriasDomain/application/useCases/buscarOCrearCategoria";
import { CategoriaRepositoryMongo } from "../categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository";
import { SelectorRespuestasService } from "../preguntasDomain/application/services/SelectorRespuestas.service";
import { CrearPregunta } from "../preguntasDomain/application/useCases/preguntas/create";
import { GetVariasPreguntasPorIds } from "../preguntasDomain/application/useCases/getPreguntasPorVariosIds";
import { PreguntaRespositoryMongoDB } from "../preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository";
import { GetGrupoPreguntasByIdCategoria } from "./applications/useCases/getGrupoPreguntasByIdCategoria.interface";
import { PreguntasPortService } from "./infrastructure/adapters/ports/preguntasPort.service";
import { GrupoPreguntasRepositoryMongo } from "./infrastructure/mongo/repositories/grupoPreguntasRepositoryMongo.repository"

export const grupoPreguntasBuilder = () => {
	const grupoPreguntasRepositoryMongo = new GrupoPreguntasRepositoryMongo();
	const preguntasRepositoryMongo = new PreguntaRespositoryMongoDB();
	const categoriaRepositoryMongo = new CategoriaRepositoryMongo();

	const selectorRespuestasService = new SelectorRespuestasService();
	const buscarOCrearCategoria = new BuscarOCrearCategoria(categoriaRepositoryMongo);
	const createPregunta = new CrearPregunta(preguntasRepositoryMongo);
	const getVariasPreguntasPorId = new GetVariasPreguntasPorIds(
		preguntasRepositoryMongo,
		selectorRespuestasService
	)

	const preguntasPortService = new PreguntasPortService(
		getVariasPreguntasPorId,
		createPregunta,
		buscarOCrearCategoria
	)

	const getGrupoPreguntasByIdCategoria = new GetGrupoPreguntasByIdCategoria(
		grupoPreguntasRepositoryMongo,
		preguntasPortService
	)

	return {
		getGrupoPreguntasByIdCategoria
	}
}