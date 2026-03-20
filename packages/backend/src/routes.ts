import express, { Express } from "express";

import preguntaRoute from "./domains/preguntasDomain/infrastructure/restApi/routers/pregunta.router";
import categoriaRoute from "./domains/categoriasDomain/infrastructure/restApi/routers/categoria.router";

const appRouter: Express = express();

appRouter.use("/pregunta/", preguntaRoute);
appRouter.use("/categoria/", categoriaRoute);

export default appRouter;