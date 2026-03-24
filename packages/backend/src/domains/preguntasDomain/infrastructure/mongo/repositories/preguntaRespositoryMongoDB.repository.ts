import { Pregunta } from "../../../../../domains/preguntasDomain/domain/entities/Pregunta";
import { IPreguntaRepository } from "../../../../../domains/preguntasDomain/domain/repositories/preguntasRepository.interface";
import { MapPreguntasMongo } from "../mappers/mapPreguntasMongo.mapper";
import preguntaModel from "../schemas/pregunta.schema";

export class PreguntaRespositoryMongoDB implements IPreguntaRepository {
	async getPreguntasPorCategoriaPaginando(idCategoria: string, pagina: number, limit: number): Promise<Pregunta[]> {
		const skip = (pagina - 1) * limit;

		const docs = await preguntaModel
			.find({ 
				categorias: { $in: [idCategoria] }, 
				respuestas: { $elemMatch: { correcta: true } }
			})
			.skip(skip)
			.limit(limit)
			.lean();
		return docs.map(MapPreguntasMongo.toEntity);
	}

	async createPregunta(pregunta: Pregunta): Promise<Pregunta> {
		const modelPregunta = MapPreguntasMongo.toModel(pregunta);
		const doc = await preguntaModel.create(modelPregunta);
		return MapPreguntasMongo.toEntity(doc);
	}
	
	async getNumeroPreguntasTotales(): Promise<number> {
		const result = await preguntaModel.find().countDocuments();
		return result
	}

	async getNumeroPreguntasPorCategoria(idCategoria: string): Promise<number> {
		const result = await preguntaModel.find({ categorias: { $in: [idCategoria] } }).countDocuments();
		return result
	}

	async getPreguntasPorCategoria(idCategoria: string): Promise<Pregunta[]> {
		/**
		 * Habria que revisar que todas las respuestas tengan una correcta por lo menos, esto creo que viene de la conversion del excel
		 */
		const docs = await preguntaModel.find({ 
			categorias: { $in: [idCategoria] }, 
			respuestas: { $elemMatch: { correcta: true } }
		})
		return docs.map(MapPreguntasMongo.toEntity);
	}
	
	getAllPreguntas(): Promise<Pregunta[]> {
		throw new Error("Method not implemented.");
	}
}