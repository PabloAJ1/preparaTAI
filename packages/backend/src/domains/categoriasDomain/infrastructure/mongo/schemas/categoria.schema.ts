import { Schema, model, Document } from 'mongoose';
import { ICategoria } from '../interfaces/categoria.interface';

export interface ICategoriaDocument extends ICategoria, Document {}

const CategoriaSchema = new Schema<ICategoriaDocument>({
	idCategoria: { type: String, required: true, unique: true },
	nombreCategoria: { type: String, required: true },
	tipo: { type: String, required: true },
}, { 
	timestamps: false 
});

const PreguntaModel = model<ICategoriaDocument>('Categoria', CategoriaSchema);

export default PreguntaModel;