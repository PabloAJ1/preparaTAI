import express, { Express } from "express";

import preguntaRoute from "./domains/preguntasDomain/infrastructure/restApi/routers/pregunta.router";

const appRouter: Express = express();

appRouter.use("/pregunta/", preguntaRoute);

export default appRouter;