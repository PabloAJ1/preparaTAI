import { InicializarCategorias } from "../../domains/categoriasDomain/application/useCases/inicializarCategorias"
import { CategoriasSyncService } from "../../domains/categoriasDomain/infrastructure/adapters/ports/categoriasSync.service"
import { CategoriasExternalAtlasService } from "../../domains/categoriasDomain/infrastructure/atlas/services/categoriasExternalAtlas.service"
import { CategoriaRepositoryMongo } from "../../domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository"
import { InicializarPreguntas } from "../../domains/preguntasDomain/application/useCases/inicializarPreguntas"
import { PreguntasSyncPort } from "../../domains/preguntasDomain/infrastructure/adapters/ports/preguntasSyncPort.service"
import { PreguntasExternalAtlasService } from "../../domains/preguntasDomain/infrastructure/atlas/services/PreguntasExternalAtlas.service"
import { PreguntaRespositoryMongoDB } from "../../domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository"
import { InicializarDB } from "../application/useCases/inicializarDB"
import { CategoriaPortService } from "../infrastructure/adapters/services/categoriaPort.service"
import { PreguntasPortService } from "../infrastructure/adapters/services/preguntasPort.service"

export const inicializarDBBuilder = () => {
	//Inicializar Categorias
	const categoriasRepositories = new CategoriaRepositoryMongo()
	const getCategoriasFromAtlas = new CategoriasExternalAtlasService()
	const categoriasSyncPortService = new CategoriasSyncService(getCategoriasFromAtlas)
	const inicializarCategoriasUseCase = new InicializarCategorias(categoriasSyncPortService, categoriasRepositories)
	const categoriaPort = new CategoriaPortService(inicializarCategoriasUseCase)

	//Inicializar Preguntas
	const preguntaRepository = new PreguntaRespositoryMongoDB()
	const getPreguntasFromAtlas = new PreguntasExternalAtlasService()
	const preguntasSyncPortService = new PreguntasSyncPort(getPreguntasFromAtlas)
	const inicializarPreguntasUseCase = new InicializarPreguntas(preguntasSyncPortService, preguntaRepository)
	const preguntasPort = new PreguntasPortService(inicializarPreguntasUseCase)

	const inicializarDB = new InicializarDB(categoriaPort, preguntasPort)

	return {
		inicializarDB
	}
}
