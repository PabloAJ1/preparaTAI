import * as dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, 'environment/.env.dev');
dotenv.config({ path: envPath });

console.log('ENVIROMENT cargado en setupFiles:', process.env.ENVIROMENT);