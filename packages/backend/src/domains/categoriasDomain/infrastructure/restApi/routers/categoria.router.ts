import { Router, RequestHandler } from "express";
import { 
	handleGetCategoriasResumen,
} from "../../http/controllers/categoria.controller";

export const preguntaRoute: Router = Router();

preguntaRoute
	.route("/resumen")
	.get(handleGetCategoriasResumen as RequestHandler)

export default preguntaRoute;