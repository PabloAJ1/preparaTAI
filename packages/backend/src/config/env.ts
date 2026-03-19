import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const envFile = `.env.${process.env.NODE_ENV ?? "dev"}`;

// Intenta buscar el archivo tanto en src/bin (dev) como en dist/bin (prod)
const possiblePaths = [
	path.resolve(process.cwd(), "packages", "backend", "environment", envFile),  // entorno dev
	path.resolve(process.cwd(), envFile),                // entorno prod
	path.resolve(process.cwd(), "..", envFile),          // fallback (por si ejecutas desde bin)
];

const envPath = possiblePaths.find(p => fs.existsSync(p));
if (envPath) {
	dotenv.config({ path: envPath });
	console.info(`✅ Variables de entorno cargadas desde: ${envPath}`);
} else {
  	console.warn(`⚠️ No se encontró el archivo de entorno (${envFile}) en ninguna ruta válida.`);
}

export const ENVIROMENT = process.env.ENVIROMENT;