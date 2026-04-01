import { MongoClient } from "mongodb";

/**
 * Aqui no vamos a utilizar mongoose, ya que solo vamos a utilizar la conexion para leer datos, no precisamos de esquemas, validacion, etc...
 */

let client: MongoClient;

export const getExternalDb = async () => {
	if (!client) {
		client = new MongoClient(getCadenaConexionMongoExterna());
		await client.connect();
	}

	return client.db(process.env.MONGO_EXT_DB);
};

const getCadenaConexionMongoExterna = () => {
	const cadenaDeConexio = 
		`${process.env.MONGO_EXT_TYPE}://${process.env.MONGO_EXT_USER}:${process.env.MONGO_EXT_PASSWORD}@${process.env.MONGO_EXT_SERVER}/${process.env.MONGO_EXT_DB}`;
	return cadenaDeConexio;
};