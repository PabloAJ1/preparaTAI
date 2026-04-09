import { Schema } from 'mongoose';
import { IRespuesta } from '../interfaces/respuesta.interface';

export const RespuestaSchema = new Schema<IRespuesta>({
    enunciado: { type: String, required: true },
    id: { type: String, required: true },
    correcta: { type: Boolean, required: true }
}, { _id: false });