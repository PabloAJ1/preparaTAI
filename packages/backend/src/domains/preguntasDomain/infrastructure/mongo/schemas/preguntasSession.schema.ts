import { Schema, model, Document } from 'mongoose';
import { IPreguntasSession } from '../interfaces/preguntasSession.interface';

export interface IPreguntasSessionDocument extends IPreguntasSession, Document {}

const PreguntasSessionSchema = new Schema<IPreguntasSessionDocument>({
    id: { type: String, required: true, unique: true },
    listaPreguntasId: { type: [String], required: true },
    seed: { type: Number, required: true },
    createAt: { type: Date, required: true }
}, { 
    timestamps: false 
});

//Creamos indices por optimización
PreguntasSessionSchema.index({ createAt: 1 }, { expireAfterSeconds: 3600 });

const PreguntasSessionModel = model<IPreguntasSessionDocument>('PreguntasSession', PreguntasSessionSchema);

export default PreguntasSessionModel;