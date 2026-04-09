import { test, expect, describe } from 'vitest';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { GetAllCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/getAllCategorias';
import { ExcelLoader } from '../../../../../src/domains/preguntasDomain/infrastructure/excel/services/excelLoader.service';
import { ExcelAdapterService } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/excelAdapter.service';
import { GetListOfCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/getListOfCategorias';
import { CreateListOfCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/createListOfCategorias';
import { CategoriaAdaperServive } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/categoriasAdapter.service';
import { CategoriasExternasService } from '../../../../../src/domains/preguntasDomain/application/services/CategoriasExternas.service';
import { LoadPreguntasFromFile } from '../../../../../src/domains/preguntasDomain/application/useCases/loadPreguntasFromFile';
import { FormateadorCodigoService } from '../../../../../src/shared/infrastructure/services/services/parserCode.service';
import { DetectorLenguajeHighlight } from '../../../../../src/shared/infrastructure/services/services/highlightDetector.service';
import { DetectorLenguajeCodigo } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/detectorCodigoPort.service';

describe('#Test > integration > domains > preguntasDomain > application > usesCases > migration ... ', () => {
	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	const categoriaMongoDBRepository = new CategoriaRepositoryMongo()

	const path = "./test/preguntasDomain/helpers/preguntas_20260406.xlsx"
	const excelLoader = new ExcelLoader();
	const excelAdapterService = new ExcelAdapterService(excelLoader, path);

	const getAllCategoriasPort = new GetAllCategorias(categoriaMongoDBRepository);
	const crateListOfCategorias = new CreateListOfCategorias(categoriaMongoDBRepository);
	const getListOfCategorias = new GetListOfCategorias(categoriaMongoDBRepository)
	const categoriaAdapertService = new CategoriaAdaperServive(
		getAllCategoriasPort,
		crateListOfCategorias,
		getListOfCategorias
	)
	const categoriasExternasService = new CategoriasExternasService(categoriaAdapertService)
	const formatCodeService = new FormateadorCodigoService();
	const detectorDeCodigo = new DetectorLenguajeHighlight();
	const detectarCodigoContenidoEnunciadoService = new DetectorLenguajeCodigo(
		detectorDeCodigo,
		formatCodeService,		
	)	

	const getPreguntasFromFileUseCase = new LoadPreguntasFromFile(
		excelAdapterService,
		preguntasRepositoryMongoDB,
		categoriasExternasService,
		detectarCodigoContenidoEnunciadoService
	)

	test('deberia leer el fichero y devolver las SQL', async () => {
		await getPreguntasFromFileUseCase.exec();
		expect(true).toBeTruthy();	
	});
});