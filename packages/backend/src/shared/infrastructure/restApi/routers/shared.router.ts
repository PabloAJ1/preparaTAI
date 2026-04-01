import { Router, RequestHandler } from "express";
import { handleInicializarDB } from "../../http/controllers/inicializarDB.controller";

export const sharedRoute: Router = Router();

sharedRoute
    .route("/inicializarDB")
	.get(handleInicializarDB as RequestHandler)

export default sharedRoute;
