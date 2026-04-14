import { Schema, model, Document } from 'mongoose';
import { IPractica } from '../interfaces/practica.interface';

export interface IPracticaDocument extends IPractica, Document {}

const PracticaSchema = new Schema<IPracticaDocument>({
	idPractica: { type: String, required: true, unique: true },
	nombrePractica: { type: String, required: true, unique: true },
	respuestasCorrectas: {
		type: Map,
		of: String,
		required: true
	}
}, { 
	timestamps: false 
});

PracticaSchema.index({ idPractica: 1 });

const PracticaModel = model<IPracticaDocument>('Practica', PracticaSchema);

export default PracticaModel;