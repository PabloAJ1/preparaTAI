import mongoose from "mongoose";

let connected = false;

export const getExternalConnection = async () => {
	if (connected) return mongoose;

	const mongoConnectionString = getCadenaConexionMongoExterna();

	await mongoose.connect(mongoConnectionString, {
		autoIndex: false,
	});

	connected = true;

	return mongoose;
};

export const getCadenaConexionMongoExterna = () => {
	return `mongodb://${process.env.MONGO_EXT_USER}:${process.env.MONGO_EXT_PASSWORD}@${process.env.MONGO_EXT_SERVER}/${process.env.MONGO_EXT_DB}`;
};