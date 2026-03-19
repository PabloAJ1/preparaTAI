import { Router, RequestHandler } from "express";
import { 
	handleGetNumeroPreguntas,
} from "../../http/controllers/pregunta.controller";

export const preguntaRoute: Router = Router();

preguntaRoute
    .route("/getNumeroDePreguntas")
	.get(handleGetNumeroPreguntas as RequestHandler)

export default preguntaRoute;