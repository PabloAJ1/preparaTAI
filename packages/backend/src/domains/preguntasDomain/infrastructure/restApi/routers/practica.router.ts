import { Router, RequestHandler } from "express";
import { 
	handleCrearPractica,
	handleMigrarPractica,
	handleGetAllWithEstadisticas,
	handleGetPreguntasPractica
} from "../../http/controllers/practica.controller";

export const practicaRoute: Router = Router();

practicaRoute
	.route("/")
	.get(handleGetAllWithEstadisticas as RequestHandler)

practicaRoute
	.route("/crearPractica")
	.post(handleCrearPractica as RequestHandler)

practicaRoute
	.route("/migracion")
	.get(handleMigrarPractica as RequestHandler)

practicaRoute
	.route("/:id")
	.get(handleGetPreguntasPractica as RequestHandler)

export default practicaRoute;
	