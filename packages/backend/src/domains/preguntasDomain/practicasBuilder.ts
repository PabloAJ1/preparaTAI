import { CreatePractica } from "./application/useCases/practicas/create";
import { GetPreguntasPractica } from "./application/useCases/practicas/getById";
import { GetListadoPracticasConEstadisticas } from "./application/useCases/practicas/getWithEstadisticas";
import { MigrarPracticas } from "./application/useCases/practicas/migrar";
import { categoriasExternalBuild } from "./categoriasExternalBuild";
import { GestionPracticaService } from "./application/services/GestionPractica.service";
import { PreguntaSessionService } from "./domain/services/PreguntaSession.service";
import { PracticasMongoDBRepository } from "./infrastructure/mongo/repositories/practicasMongoDBRepository.repository"
import { PreguntaRespositoryMongoDB } from "./infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository";
import { PreguntasSessionRepositoryMongo } from "./infrastructure/mongo/repositories/preguntasSessionRepositoryMongo.repository";

export const practicasBuilder = () => {
	const {
		categoriaAdapertService
	} = categoriasExternalBuild();

	const practicasMongoDBRepository = new PracticasMongoDBRepository();
	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	const preguntasSessionRepository = new PreguntasSessionRepositoryMongo();

	const preguntasSessionSevice = new PreguntaSessionService(
		preguntasSessionRepository
	)
	const gestionPracticaService = new GestionPracticaService(practicasMongoDBRepository)

	const crear = new CreatePractica(
		preguntasRepositoryMongoDB,
		categoriaAdapertService,
		gestionPracticaService
	)

	const migrar = new MigrarPracticas(
		preguntasRepositoryMongoDB,
		categoriaAdapertService,
		practicasMongoDBRepository
	)

	const allWithEstadisticas = new GetListadoPracticasConEstadisticas(
		preguntasRepositoryMongoDB,
		practicasMongoDBRepository,
	)

	const getPreguntasPractica = new GetPreguntasPractica(
		preguntasRepositoryMongoDB,
		practicasMongoDBRepository,
		preguntasSessionSevice
	)

	return { 
		practica : {
			crear,
			migrar,
			get: {
				allWithEstadisticas,
				preguntas: getPreguntasPractica
			}
		}
	}
}