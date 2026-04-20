import { CategoriasExternasService } from './application/services/CategoriasExternas.service';
import { GetNumeroPreguntas } from './application/useCases/getNumeroDePreguntas';
import { LoadPreguntasFromFile } from './application/useCases/loadPreguntasFromFile';
import { GetPreguntasPorCateogira } from './application/useCases/getPreguntasPorCateogira';
import { GetPreguntasPorCateogiraConPaginacion } from './application/useCases/getPreguntasPorCateogiraConPaginacion';
import { ExcelAdapterService } from './infrastructure/adapters/ports/excelAdapter.service';
import { ExcelLoader } from './infrastructure/excel/services/excelLoader.service';
import { PreguntaRespositoryMongoDB } from './infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { RegistarEstadisticaByPregunta } from './application/useCases/registarEstadisticaByPregunta';
import { ReiniciarEstadisticas } from './application/useCases/reiniciarEstadisticas.interface';
import { EnterrarPregunta } from './application/useCases/enterrarPregunta';
import { UpdatePreguntaById } from './application/useCases/updatePreguntaById';
import { DesenterrarPreguntas } from './application/useCases/desenterrarPreguntas';
import { DetectorLenguajeHighlight } from '../../shared/infrastructure/services/services/highlightDetector.service';
import { DetectorLenguajeCodigo } from './infrastructure/adapters/ports/detectorCodigoPort.service';
import { FormateadorCodigoService } from '../grupoPreguntas/domain/services/codeFormat.service';
import { GetPreguntasPorCateogiraConSesion } from './application/useCases/getPreguntasPorCateogiraConPaginacionYSesion';
import { PreguntasSessionRepositoryMongo } from './infrastructure/mongo/repositories/preguntasSessionRepositoryMongo.repository';
import { CrearPregunta } from './application/useCases/preguntas/create';
import { categoriasExternalBuild } from './categoriasExternalBuild';
import { PreguntaSessionService } from './domain/services/PreguntaSession.service';
import { GenerarListaPreguntasService } from './application/services/GenerarListaPreguntas.service';
import { MezclarPreguntasService } from './application/services/MezclarPreguntas.service';
import { SelectorRespuestasService } from './application/services/SelectorRespuestas.service';

export const preguntasBuilder = () => {
	const {
		categoriaAdapertService
	} = categoriasExternalBuild();

	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	const preguntasSessionRepositoryMongoDB = new PreguntasSessionRepositoryMongo()

	const path = '';
	const excelLoader = new ExcelLoader();
	const excelAdapterService = new ExcelAdapterService(excelLoader, path);

	const categoriasExternasService = new CategoriasExternasService(
		categoriaAdapertService
	);
	const detectarCodigoEnEnunciadoService = new DetectorLenguajeHighlight()
	const parsearCodigo = new FormateadorCodigoService()
	const detectorLenguajeCodigo = new DetectorLenguajeCodigo(
		detectarCodigoEnEnunciadoService,
		parsearCodigo
	)
	const getPreguntasFromFileUseCase = new LoadPreguntasFromFile(
		excelAdapterService,
		preguntasRepositoryMongoDB,
		categoriasExternasService,
		detectorLenguajeCodigo
	);

	const getNumeroPreguntas = new GetNumeroPreguntas(preguntasRepositoryMongoDB);
	const selectorRespuestasService = new SelectorRespuestasService();
	const getPreguntasPorCategoria = new GetPreguntasPorCateogira(
		preguntasRepositoryMongoDB,
		selectorRespuestasService
	);
	const getPreguntasPorCategoriaPaginando =
		new GetPreguntasPorCateogiraConPaginacion(
			preguntasRepositoryMongoDB
		);

	const preguntasSessionSevice = new PreguntaSessionService(
		preguntasSessionRepositoryMongoDB
	)

	const mezclarPreguntasService = new MezclarPreguntasService();
	const generarListaPreguntasService = new GenerarListaPreguntasService(
		mezclarPreguntasService,
		selectorRespuestasService,
		categoriaAdapertService
	)

	const getPreguntasPorCateogiraConSesion = new GetPreguntasPorCateogiraConSesion(
		preguntasRepositoryMongoDB,
		preguntasSessionSevice,
		generarListaPreguntasService,
		categoriaAdapertService
	);
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
	const crearPregunta = new CrearPregunta(preguntasRepositoryMongoDB);

	return {
		pregunta: {
			get: {
				count: getNumeroPreguntas,
				byCategoria: getPreguntasPorCategoria,
				fromFile: getPreguntasFromFileUseCase,
				withSession: getPreguntasPorCateogiraConSesion,
				withPagination: getPreguntasPorCategoriaPaginando,			
			},
			create: crearPregunta,
			update: {
				atributos: editarEnunciadoPreguntaById,
				enterrar: enterrarPregunta,
				desenterrar: desenterrarPreguntas,
			},
			estadisticas: {
				reiniciar: reiniciarEstadisticas,
				registrar: registarEstadisticaByPregunta,
			}
		},
	};
};
