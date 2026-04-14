import express, { Express } from "express";

import preguntaRoute from "./domains/preguntasDomain/infrastructure/restApi/routers/pregunta.router";
import categoriaRoute from "./domains/categoriasDomain/infrastructure/restApi/routers/categoria.router";
import sharedRoute from "./shared/infrastructure/restApi/routers/shared.router";
import grupoPreguntaRoute from "./domains/grupoPreguntas/infrastructure/restApi/routers/grupoPreguntas.router";
import practicaRoute from "./domains/preguntasDomain/infrastructure/restApi/routers/practica.router";

const appRouter: Express = express();

appRouter.use("/pregunta/", preguntaRoute);
appRouter.use("/practica/", practicaRoute);
appRouter.use("/categoria/", categoriaRoute);
appRouter.use("/gruposDePreguntasRelacionadas/", grupoPreguntaRoute);
appRouter.use("/shared/", sharedRoute);

export default appRouter;