import { Schema, model, Document } from 'mongoose';
import { IPregunta } from '../interfaces/pregunta.interface';
import { RespuestaSchema } from './respuesta.schema';

export interface IPreguntaDocument extends IPregunta, Document {}

const PreguntaSchema = new Schema<IPreguntaDocument>({
    idPregunta: { type: String, required: true, unique: true },
    enunciado: { type: String, required: true },
    respuestas: { type: [RespuestaSchema], default: [] },
    categorias: { type: [String], default: [] }
}, { 
    timestamps: false 
});

const PreguntaModel = model<IPreguntaDocument>('Pregunta', PreguntaSchema);

export default PreguntaModel;