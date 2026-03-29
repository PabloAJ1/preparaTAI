import mongoose from 'mongoose';

export const start = async (): Promise<void> => {
	if (!process.env.ENVIROMENT)
		console.error(
			'Error en la conexión. No se ha establecido la variable de entorno'
		);
	else {
		console.warn('Iniciando la conexion con MongoDB');
		console.warn(
			'Variable de entorno establecida en: ',
			process.env.ENVIROMENT
		);
		const mongoConnectionString = getCadenaConexionMongo(
			process.env.ENVIROMENT
		);
		mongoose.Promise = global.Promise;
		await mongoose
			.connect(mongoConnectionString, { autoIndex: true })
			.then(() => {
				console.warn('Conexion establecida');
			})
			.catch((err) => {
				console.error(err);
			});
	}
};

export const getCadenaConexionMongo = (envVar: string) => {
	const conexion = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}?authSource=admin`;
	return conexion;
};

export default mongoose;
