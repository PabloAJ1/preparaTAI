import express, { Express } from "express";

import preguntaRoute from "./domains/preguntasDomain/infrastructure/restApi/routers/pregunta.router";
import categoriaRoute from "./domains/categoriasDomain/infrastructure/restApi/routers/categoria.router";
import sharedRoute from "./shared/infrastructure/restApi/routers/shared.router";

const appRouter: Express = express();

appRouter.use("/pregunta/", preguntaRoute);
appRouter.use("/categoria/", categoriaRoute);
appRouter.use("/shared/", sharedRoute);

export default appRouter;