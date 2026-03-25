import { Schema } from 'mongoose';
import { IEstadisticas } from '../interfaces/estadisticas.interface';

export const EstadisticasSchema = new Schema<IEstadisticas>({
    aciertos: { type: Number, required: true },
    fallos: { type: Number, required: true },
    total: { type: Number, required: true }
}, { _id: false });