import { Router, RequestHandler } from "express";
import { 
	handleGetNumeroPreguntas,
	handleGetPreguntasPorCategoria,
	handleRegistarEstadisticaByPregunta,
	handleReiniciarEstadisticas,
	handleEnterrarPregunta,
	handleEditarEnunciadoPregunta,
	handleDesenterrarPreguntas,
	handleCrearPregunta,
} from "../../http/controllers/pregunta.controller";

export const preguntaRoute: Router = Router();

preguntaRoute
    .route("/")
	.post(handleCrearPregunta as RequestHandler)

preguntaRoute
    .route("/getNumeroDePreguntas")
	.get(handleGetNumeroPreguntas as RequestHandler)

preguntaRoute
    .route("/porCategoria/:categoria")
	.get(handleGetPreguntasPorCategoria as RequestHandler)

preguntaRoute
    .route("/estadisticas/reiniciar")
	.get(handleReiniciarEstadisticas as RequestHandler);

preguntaRoute
    .route("/:id")
	.patch(handleEditarEnunciadoPregunta as RequestHandler);

preguntaRoute
    .route("/:id/intentos")
	.post(handleRegistarEstadisticaByPregunta as RequestHandler);

preguntaRoute
    .route("/:id/enterrar")
	.post(handleEnterrarPregunta as RequestHandler);
	
preguntaRoute
    .route("/todas/desenterrar")
	.get(handleDesenterrarPreguntas as RequestHandler);

export default preguntaRoute;
