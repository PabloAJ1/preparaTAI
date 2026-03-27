import { ICodigoMongo } from "./codigo.interface";

export interface IGrupoPreguntasMongo {
	id: string
	textoPre: string;
	textoPos: string;
	codigo: ICodigoMongo,
	preguntas: string[]
}