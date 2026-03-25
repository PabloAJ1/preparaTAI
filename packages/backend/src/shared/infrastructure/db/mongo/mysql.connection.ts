import mongoose from "mongoose";

export const start = async (): Promise<void> => {
    if (!process.env.ENVIROMENT)
        console.error("Error en la conexión. No se ha establecido la variable de entorno");
    else {
        console.warn("Iniciando la conexion con MongoDB");
        console.warn("Variable de entorno establecida en: ", process.env.ENVIROMENT);
        const mongoConnectionString = getCadenaConexionMongo(process.env.ENVIROMENT)
        mongoose.Promise = global.Promise;
        await mongoose.connect(mongoConnectionString, { autoIndex: true }).then(() => {
            console.warn("Conexion establecida");
        }).catch((err) => {
            console.error(err);
        });
    }
};

export const getCadenaConexionMongo = (envVar: string) => {
    let mongoConnectionString = "";

    const servidor = process.env.MONGO_ATLAS === "true" ? "mongodb+srv" : "mongodb"
    const conexion = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`
    const atlasOptions = process.env.MONGO_ATLAS  === "true" ? "?connectTimeoutMS=5000&retryWrites=true&w=majority&appName=Cluster0" : ""

    switch (envVar) {
        case "TEST":
        case "dev":
            mongoConnectionString = `${servidor}://${conexion}${atlasOptions}`;
            break;
        case "production":
            mongoConnectionString = `${servidor}://${conexion}?authSource=admin`;
            break;
        case "ATLAS_PROD":
            mongoConnectionString = `${servidor}://${conexion}${atlasOptions}`
            break;
    }

	console.log("Conectando a Mongo:", mongoConnectionString);
    return mongoConnectionString;
};

export default mongoose;