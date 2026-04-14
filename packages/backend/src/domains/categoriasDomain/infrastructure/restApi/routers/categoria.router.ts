import { Router, RequestHandler } from "express";
import { 
	handles
} from "../../http/controllers/categoria.controller";

export const preguntaRoute: Router = Router();

preguntaRoute
	.route("/")
	.get(handles.getAll as RequestHandler)

preguntaRoute
	.route("/resumen")
	.get(handles.getResumen as RequestHandler)

preguntaRoute
	.route("/:id")
	.get(handles.getById as RequestHandler)

export default preguntaRoute;