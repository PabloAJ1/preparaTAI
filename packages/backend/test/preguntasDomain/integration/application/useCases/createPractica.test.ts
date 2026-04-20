import { test, expect, describe } from 'vitest';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { PracticasMongoDBRepository } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/practicasMongoDBRepository.repository';
import { GestionPracticaService } from '../../../../../src/domains/preguntasDomain/application/services/GestionPractica.service'
import { CategoriaAdaperServive } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/categoriasAdapter.service'
import { CreatePractica } from '../../../../../src/domains/preguntasDomain/application/useCases/practicas/create'
import { GetListadoPracticasConEstadisticas } from '../../../../../src/domains/preguntasDomain/application/useCases/practicas/getWithEstadisticas'
import { GetAllCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/getAllCategorias';
import { CreateListOfCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/createListOfCategorias';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { GetListOfCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/getListOfCategorias';
import { GetCategoriasByTipo } from '../../../../../src/domains/categoriasDomain/application/useCases/getCategoriasByTipo';
import { BuscarOCrearCategoria } from '../../../../../src/domains/categoriasDomain/application/useCases/buscarOCrearCategoria';
import { GetCategoriasByIds } from '../../../../../src/domains/categoriasDomain/application/useCases/getCategoriasByIds';
import { generarPracticaDto } from '../../../fakers/practica.dto';

describe('#Test > integration > domains > preguntasDomain > application > usesCases > practicas > create ... ', () => {
	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	const practicaRepositoryMongoDB = new PracticasMongoDBRepository();
	const categoriaRepositoryMongoDB = new CategoriaRepositoryMongo();

	const getAllCategoriasPort = new GetAllCategorias(categoriaRepositoryMongoDB);
	const crateListOfCategorias = new CreateListOfCategorias(categoriaRepositoryMongoDB);
	const getListOfCategorias = new GetListOfCategorias(categoriaRepositoryMongoDB)
	const buscarOCrearCategoria = new BuscarOCrearCategoria(categoriaRepositoryMongoDB)
	const getCategoriasByTipo = new GetCategoriasByTipo(categoriaRepositoryMongoDB)
	const getCategoriasByIds = new GetCategoriasByIds(categoriaRepositoryMongoDB);

	const categoriaAdapterPort = new CategoriaAdaperServive(
		getAllCategoriasPort,
		crateListOfCategorias,
		getListOfCategorias,
		buscarOCrearCategoria,
		getCategoriasByTipo,
		getCategoriasByIds
	);
	const gestionPracticasService = new GestionPracticaService(practicaRepositoryMongoDB);
	const createPractica = new CreatePractica(
		preguntasRepositoryMongoDB,
		categoriaAdapterPort,
		gestionPracticasService
	);

	const getAllPracticas = new GetListadoPracticasConEstadisticas(
		preguntasRepositoryMongoDB,
		practicaRepositoryMongoDB
	)

	test('deberia crear una practica', async () => {
		const practicaDto = generarPracticaDto();
		await createPractica.exec(practicaDto)

		const allPracticas = await getAllPracticas.exec();
		const findPractica = allPracticas.find(p => p.nombrePractica === practicaDto.nombrePractica);

		expect(findPractica).toBeDefined();
		expect(findPractica).toHaveProperty("estadisticas");
		expect(findPractica).toHaveProperty("idPractica");
		expect(findPractica).toHaveProperty("nombrePractica");
		expect(findPractica).toHaveProperty("numeroDePreguntas");

		if(findPractica){
			expect(findPractica.numeroDePreguntas).toBe(practicaDto.pregunta.length)
		}
		
	});
});

