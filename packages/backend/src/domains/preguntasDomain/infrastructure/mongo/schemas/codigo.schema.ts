import { Schema } from 'mongoose';
import { ICodigo } from '../interfaces/codigo.interface';

export const CodigoSchema = new Schema<ICodigo>({
    codigo: { type: String, required: true },
    lenguaje: { type: String, required: true }
}, { _id: false });