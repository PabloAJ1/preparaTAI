import { Router, RequestHandler } from "express";
import { 
	handleGetNumeroPreguntas,
	handleGetPreguntasPorCategoria,
	handleRegistarEstadisticaByPregunta
} from "../../http/controllers/pregunta.controller";

export const preguntaRoute: Router = Router();

preguntaRoute
    .route("/getNumeroDePreguntas")
	.get(handleGetNumeroPreguntas as RequestHandler)

preguntaRoute
    .route("/porCategoria/:categoria")
	.get(handleGetPreguntasPorCategoria as RequestHandler)

preguntaRoute
    .route("/:id/intentos")
	.post(handleRegistarEstadisticaByPregunta as RequestHandler);

export default preguntaRoute;