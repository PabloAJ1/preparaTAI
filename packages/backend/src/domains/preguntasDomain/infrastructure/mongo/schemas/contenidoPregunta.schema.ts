import { Schema } from 'mongoose';
import { IContenidoPregunta } from '../interfaces/contenidoPregunta.interface';
import { CodigoSchema } from './codigo.schema';

export const ContenidoPreguntaSchema = new Schema<IContenidoPregunta>({
	enunciado: { type: String, required: true },
	codigo: { type: CodigoSchema, required: false },
	imagen: { type: String, required: false }
}, { _id: false });