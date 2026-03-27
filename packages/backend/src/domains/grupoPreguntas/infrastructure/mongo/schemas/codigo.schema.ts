import { Schema } from 'mongoose';
import { ICodigoMongo } from '../interfaces/codigo.interface';

export const CodigoSchema = new Schema<ICodigoMongo>({
	codigo: { type: String, required: true },
	lenguaje: { type: String, required: true }
}, { _id: false });