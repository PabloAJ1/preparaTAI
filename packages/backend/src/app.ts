import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import { ENVIROMENT } from './config/env';
import appRouter from './routes';
import * as mongoose from './shared/infrastructure/db/mongo/mongo.connection';
import { join } from 'node:path';

mongoose.start();

const app: Express = express();

let origen;
if (ENVIROMENT === 'PROD') {
	origen = '*';
	app.use(logger('common'));
} else {
	origen = '*';
	app.use(logger('dev'));
}

const corsOptions = {
	origin: origen,
	optionsSuccessStatus: 200,
};

app.use(helmet.hidePoweredBy());
app.use(express.text({ type: 'text/plain' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors(corsOptions));

app.use('/api/', appRouter);

// Servidmos desde express el front
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(join(__dirname, '../../../../frontend')));
	app.get('*', (req, res) => {
		res.sendFile(join(__dirname, '../../../../frontend/index.html'));
	});
}

export default app;
