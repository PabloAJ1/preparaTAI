import { Schema, model, Document } from 'mongoose';
import { IGrupoPreguntasMongo } from '../interfaces/grupoPreguntas.interface';
import { CodigoSchema } from './codigo.schema';

export interface IGrupoPreguntaDocument extends IGrupoPreguntasMongo, Document {}

const GrupoPreguntaSchema = new Schema<IGrupoPreguntaDocument>({
    id: { type: String, required: true, unique: true },
    textoPre: { type: String, required: true },
    textoPos: { type: String, required: true },
    codigo: { type: CodigoSchema, required: true },
    preguntas: { type: [String], default: [] }
}, { 
    timestamps: false 
});

const PreguntaModel = model<IGrupoPreguntaDocument>('Pregunta', GrupoPreguntaSchema);

export default PreguntaModel;