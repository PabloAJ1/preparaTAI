import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import { ENVIROMENT } from "./config/env";
import appRouter from "./routes";

const app: Express = express();

let origen;
if (ENVIROMENT === "PROD"){
    origen = [
        "https://app.pacisa.es",
        "https://app2.pacisa.es",
        "https://vcard.pacisa.es",
        "https://preproduccion.app2.pacisa.es"
    ];
    app.use(logger("common"));
} else {
    origen = "*";
    app.use(logger("dev"));
}

const corsOptions = {
    origin: origen,
    optionsSuccessStatus: 200,
};

app.use(helmet.hidePoweredBy());
app.use(express.text({ type: 'text/plain' })); // 👈 añade esto junto a express.json()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors(corsOptions));

app.use("/api/", appRouter);

export default app;