import * as dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import * as mongooseDev from "./src/shared/infrastructure/db/mongo/mongo.connection";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, 'environment/.env.dev');
dotenv.config({ path: envPath, override: true });
console.info('ENVIROMENT cargado en setupFiles:', process.env.ENVIROMENT);

let mongoServer: MongoMemoryServer;
if (process.env.ENVIROMENT === "TEST") {
	mongoServer = await MongoMemoryServer.create({
		instance: {
			port: 0, // Puerto aleatorio
		},
		binary: {
			downloadDir: "/tmp/mongodb-binaries"
		},
		spawn: {
			timeout: 60000, // también para el arranque
		},
	});
	await mongoose.connect(mongoServer.getUri());
} else if(process.env.ENVIROMENT === "dev") {
	mongooseDev.start();
}


