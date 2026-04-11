import { InicializarCategoriasFromFile } from "../../domains/categoriasDomain/application/useCases/inicializarCategoriasFromFile"
import { GestionBDCategoriasRepositoryMongoDB } from "../../domains/categoriasDomain/infrastructure/mongo/repositories/gestionBDCategoriasRepositoryMongoDB"
import { InicializarPreguntasFromFile } from "../../domains/preguntasDomain/application/useCases/inicializarPreguntasFromFile"
import { GestionBDPreguntasRepositoryMongoDB } from "../../domains/preguntasDomain/infrastructure/mongo/repositories/gestionBDPreguntasRepositoryMongoDB"
import { InicializarDB } from "../application/useCases/inicializarDB"
import { CategoriaPortService } from "../infrastructure/adapters/services/categoriaPort.service"
import { PreguntasPortService } from "../infrastructure/adapters/services/preguntasPort.service"

export const inicializarDBBuilder = () => {
	//Inicializar Categorias
	const pathCategorias = `/init/categoriasPreparaTAIv3.json`
	const getionDBService = new GestionBDCategoriasRepositoryMongoDB(pathCategorias)
	const inicializarCategoriasUseCase = new InicializarCategoriasFromFile(
		getionDBService
	)
	const categoriaPort = new CategoriaPortService(inicializarCategoriasUseCase)

	//Inicializar Preguntas
	const pathPreguntas = `/init/preguntasPreparaTAIv3.json`
	const gestionPreguntaRepository = new GestionBDPreguntasRepositoryMongoDB(pathPreguntas)
	const inicializarPreguntasUseCase = new InicializarPreguntasFromFile(gestionPreguntaRepository)
	const preguntasPort = new PreguntasPortService(inicializarPreguntasUseCase)

	const inicializarDB = new InicializarDB(categoriaPort, preguntasPort)

	return {
		inicializarDB
	}
}
