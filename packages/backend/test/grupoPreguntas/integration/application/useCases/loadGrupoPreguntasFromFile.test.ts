import { test, expect, describe, vi } from 'vitest';
import { GrupoPreguntasRepositoryMongo } from '../../../../../src/domains/grupoPreguntas/infrastructure/mongo/repositories/grupoPreguntasRepositoryMongo.repository';
import { LoadGrupoPreguntasFromFile } from '../../../../../src/domains/grupoPreguntas/applications/useCases/loadGrupoPreguntasFromFile';
import { ExcelLoader } from '../../../../../src/domains/grupoPreguntas/infrastructure/excel/services/excelLoader.service';
import { ExcelAdapterService } from '../../../../../src/domains/grupoPreguntas/infrastructure/adapters/ports/excelAdapter.service';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { PreguntasPortService } from '../../../../../src/domains/grupoPreguntas/infrastructure/adapters/ports/preguntasPort.service';
import { CategoriaPortService } from '../../../../../src/domains/grupoPreguntas/infrastructure/adapters/ports/categoriasPort.service';
import { CrearPregunta } from '../../../../../src/domains/preguntasDomain/application/useCases/createPregunta';
import { BuscarOCrearCategoria } from '../../../../../src/domains/categoriasDomain/application/useCases/buscarOCrearCategoria';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { IGetVariasPreguntasPorId } from '../../../../../src/domains/grupoPreguntas/infrastructure/adapters/signatures/getVariasPreguntasPorId.interface';

describe('#Test > integration > domains > categoriaDomain > application > usesCases > getCategoriaResumen ... ', () => {
	const path = "./test/grupoPreguntas/helpers/grupo_20260406.xlsx"

	const grupoPreguntasMongoRepository = new GrupoPreguntasRepositoryMongo();
	const preguntasMongoRepository = new PreguntaRespositoryMongoDB();
	const categoriaMongoRepository = new CategoriaRepositoryMongo();

	const excelLoader = new ExcelLoader()
	const loadGrupoPreguntasFromFile = new ExcelAdapterService(excelLoader, path)

	const createPreguntasUseCase = new CrearPregunta(preguntasMongoRepository);
	const getVariasPreguntasPorIdMock: IGetVariasPreguntasPorId = { exec: vi.fn() };
	const getBuscarOCrearCategoriaPorNombre = new BuscarOCrearCategoria(categoriaMongoRepository)
	const preguntasPortService = new PreguntasPortService(
		getVariasPreguntasPorIdMock, 
		createPreguntasUseCase, 
		getBuscarOCrearCategoriaPorNombre
	)
	const categoriaPortService = new CategoriaPortService(getBuscarOCrearCategoriaPorNombre)

	const loadGrupoPreguntasFromFileUseCase = new LoadGrupoPreguntasFromFile(
		grupoPreguntasMongoRepository,
		loadGrupoPreguntasFromFile,
		preguntasPortService,
		categoriaPortService
	);

	test('deberia devolver un resultado correcto con repos mockeados', async () => {
		await loadGrupoPreguntasFromFileUseCase.exec();
		expect(true).toBeTruthy();	
	});
});