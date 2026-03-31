import { CreateListOfCategorias } from '../categoriasDomain/application/useCases/createListOfCategorias';
import { GetAllCategorias } from '../categoriasDomain/application/useCases/getAllCategorias';
import { GetListOfCategorias } from '../categoriasDomain/application/useCases/getListOfCategorias';
import { CategoriaRepositoryMongo } from '../categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { CategoriasExternasService } from './application/services/CategoriasExternas.service';
import { GetNumeroPreguntas } from './application/useCases/getNumeroDePreguntas';
import { LoadPreguntasFromFile } from './application/useCases/loadPreguntasFromFile';
import { GetPreguntasPorCateogira } from './application/useCases/getPreguntasPorCateogira';
import { GetPreguntasPorCateogiraConPaginacion } from './application/useCases/getPreguntasPorCateogiraConPaginacion';
import { CategoriaAdaperServive } from './infrastructure/adapters/ports/categoriasAdapter.service';
import { ExcelAdapterService } from './infrastructure/adapters/ports/excelAdapter.service';
import { ExcelLoader } from './infrastructure/excel/services/excelLoader.service';
import { PreguntaRespositoryMongoDB } from './infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { RegistarEstadisticaByPregunta } from './application/useCases/registarEstadisticaByPregunta';
import { ReiniciarEstadisticas } from './application/useCases/reiniciarEstadisticas.interface';
import { EnterrarPregunta } from './application/useCases/enterrarPregunta';
import { UpdatePreguntaById } from './application/useCases/updatePreguntaById.interface';
import { DesenterrarPreguntas } from './application/useCases/desenterrarPreguntas';

export const preguntasBuilder = () => {
	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	const categoriaMongoDBRepository = new CategoriaRepositoryMongo();

	const path = '';
	const excelLoader = new ExcelLoader();
	const excelAdapterService = new ExcelAdapterService(excelLoader, path);

	const getAllCategoriasPort = new GetAllCategorias(categoriaMongoDBRepository);
	const crateListOfCategorias = new CreateListOfCategorias(
		categoriaMongoDBRepository
	);
	const getListOfCategorias = new GetListOfCategorias(
		categoriaMongoDBRepository
	);
	const categoriaAdapertService = new CategoriaAdaperServive(
		getAllCategoriasPort,
		crateListOfCategorias,
		getListOfCategorias
	);
	const categoriasExternasService = new CategoriasExternasService(
		categoriaAdapertService
	);
	const getPreguntasFromFileUseCase = new LoadPreguntasFromFile(
		excelAdapterService,
		preguntasRepositoryMongoDB,
		categoriasExternasService
	);

	const getNumeroPreguntas = new GetNumeroPreguntas(preguntasRepositoryMongoDB);
	const getPreguntasPorCategoria = new GetPreguntasPorCateogira(
		preguntasRepositoryMongoDB
	);
	const getPreguntasPorCategoriaPaginando =
		new GetPreguntasPorCateogiraConPaginacion(preguntasRepositoryMongoDB);
	const registarEstadisticaByPregunta = new RegistarEstadisticaByPregunta(
		preguntasRepositoryMongoDB
	);
	const reiniciarEstadisticas = new ReiniciarEstadisticas(
		preguntasRepositoryMongoDB
	);
	const enterrarPregunta = new EnterrarPregunta(preguntasRepositoryMongoDB);
	const editarEnunciadoPreguntaById = new UpdatePreguntaById(
		preguntasRepositoryMongoDB
	);

	const desenterrarPreguntas = new DesenterrarPreguntas(preguntasRepositoryMongoDB);

	return {
		getNumeroPreguntas,
		getPreguntasPorCategoria,
		getPreguntasFromFileUseCase,
		getPreguntasPorCategoriaPaginando,
		registarEstadisticaByPregunta,
		reiniciarEstadisticas,
		enterrarPregunta,
		editarEnunciadoPreguntaById,
		desenterrarPreguntas
	};
};
