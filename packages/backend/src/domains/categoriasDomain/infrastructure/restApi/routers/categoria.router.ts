import { Router, RequestHandler } from "express";
import { 
	handleGetCategoriasResumen,
	handleGetCategoriaById
} from "../../http/controllers/categoria.controller";

export const preguntaRoute: Router = Router();

preguntaRoute
	.route("/resumen")
	.get(handleGetCategoriasResumen as RequestHandler)

preguntaRoute
	.route("/:id")
	.get(handleGetCategoriaById as RequestHandler)

export default preguntaRoute;