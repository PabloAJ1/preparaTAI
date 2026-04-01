import mongoose from 'mongoose';

export const start = async (): Promise<void> => {
	if (!process.env.ENVIROMENT)
		console.error(
			'Error en la conexión. No se ha establecido la variable de entorno'
		);
	else {
		console.info('Iniciando la conexion con MongoDB');
		console.info(
			'Variable de entorno establecida en: ',
			process.env.ENVIROMENT
		);
		const mongoConnectionString = getCadenaConexionMongo();
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

export const getCadenaConexionMongo = () => {
	const conexion = `${process.env.MONGO_TYPE}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}${process.env.MONGO_AUTH}`;
	return conexion;
};

export default mongoose;
