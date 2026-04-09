import { Router, RequestHandler } from "express";
import { 
	handleGetGrupoPreguntasByIdCategoria
} from "../../http/controllers/grupoPreguntas.controller";

export const grupoPreguntaRoute: Router = Router();

grupoPreguntaRoute
	.route("/porCategoria/:id")
	.get(handleGetGrupoPreguntasByIdCategoria as RequestHandler)

export default grupoPreguntaRoute;
