import { Schema, model, Document } from 'mongoose';
import { IPregunta } from '../interfaces/pregunta.interface';
import { RespuestaSchema } from './respuesta.schema';
import { EstadisticasSchema } from './estadisticas.schema';

export interface IPreguntaDocument extends IPregunta, Document {}

const PreguntaSchema = new Schema<IPreguntaDocument>({
    idPregunta: { type: String, required: true, unique: true },
    enunciado: { type: String, required: true },
    respuestas: { type: [RespuestaSchema], default: [] },
    estadisticas: { type: EstadisticasSchema, default: { aciertos: 0, fallos: 0, total: 0 } },
    categorias: { type: [String], default: [] }
}, { 
    timestamps: false 
});

const PreguntaModel = model<IPreguntaDocument>('Pregunta', PreguntaSchema);

export default PreguntaModel;