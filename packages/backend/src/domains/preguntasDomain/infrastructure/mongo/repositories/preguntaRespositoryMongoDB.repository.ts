import { QueryFilter } from 'mongoose';
import { Pregunta } from '../../../../../domains/preguntasDomain/domain/entities/Pregunta';
import { IPreguntaRepository } from '../../../../../domains/preguntasDomain/domain/repositories/preguntasRepository.interface';
import { PreguntaNoActualizadaById } from '../../../application/errors/PreguntaNoActualizadaById.error';
import { PreguntaNoEncontradaById } from '../../../application/errors/PreguntaNoEncontradaById.error';
import { MapPreguntasMongo } from '../mappers/mapPreguntasMongo.mapper';
import preguntaModel, { IPreguntaDocument } from '../schemas/pregunta.schema';
import { chunkArrayService } from '../services/chunkPreguntas.service';

export class PreguntaRespositoryMongoDB implements IPreguntaRepository {
	async getIdsPreguntasByCategoria(idCategoria: string): Promise<string[]> {

	}

	async getPreguntasMarcadasParaRevisar(): Promise<Pregunta[]> {
		return this.#getPreguntasByQuery({estado: "Marcado para revisar"})
	}

	async getVariasPreguntasPorIds(idsPreguntas: string[]): Promise<Pregunta[]> {
		return this.#getPreguntasByQuery({ idPregunta: { $in: idsPreguntas} })
	}

	async getNumeroPreguntasAciertosYFallosPorCateogira(idCategoria: string): Promise<{ numeroPreguntas: number; aciertos: number; fallos: number; }> {
		const doc = await preguntaModel.aggregate([
			{
				$match: {
					categorias: { $in: [idCategoria] },
				},
			},
			{
				$group: {
					_id: null,
					numeroPreguntas: { $sum: 1 },
					aciertos: { $sum: { $ifNull: ["$estadisticas.aciertos", 0] } },
					fallos: { $sum: { $ifNull: ["$estadisticas.fallos", 0] } },
				}
			}
		]);
		return doc[0] || {
			numeroPreguntas: 0,
			aciertos: 0,
			fallos: 0,
		};
	}

	async createBulkPreguntas(preguntas: Pregunta[]): Promise<void> {
		const total = preguntas.length;
		const tamanioChunk = 1000
		const totalCliclos = Math.trunc(total / tamanioChunk) + 1
		let ciclo = 1;

		const preguntasModel = preguntas.map(MapPreguntasMongo.toModel)
		const batches = chunkArrayService(preguntasModel, tamanioChunk);

		for (const batch of batches) {
			console.info(`Iniciando ciclo ${ciclo}/${totalCliclos}`);
			const operaciones = batch.map((pregunta) => ({
				updateOne: {
					filter: { idPregunta: pregunta.idPregunta },
					update: { $set: pregunta },
					upsert: true
				}
			}));

			await preguntaModel.bulkWrite(operaciones);
			console.info(`Sincronizado el ${ciclo * 100 / totalCliclos} %`);
			ciclo++;
		}
	}

	async limpiarDB(): Promise<void> {
		await preguntaModel.deleteMany({})
	}

	async getPreguntasEnterradas(): Promise<Pregunta[]> {
		const query: QueryFilter<IPreguntaDocument> = {
			estado: "Enterrado"
		}

		return this.#getPreguntasByQuery(query)
	}

	async reiniciarAllEstadisticas(): Promise<void> {
		await preguntaModel.updateMany(
			{}, // filtro vacío para seleccionar todas las preguntas
			{
				$set: {
					'estadisticas.aciertos': 0,
					'estadisticas.fallos': 0,
					'estadisticas.total': 0,
				},
			}
		);
	}

	async getPreguntaById(idPregunta: string): Promise<Pregunta> {
		const doc = await preguntaModel.findOne({ idPregunta: idPregunta });
		if (!doc) throw new PreguntaNoEncontradaById(idPregunta);
		return MapPreguntasMongo.toEntity(doc);
	}

	async updatePreguntaById(pregunta: Pregunta): Promise<Pregunta> {
		const model = MapPreguntasMongo.toModel(pregunta);
		const doc = await preguntaModel.findOneAndUpdate(
			{ idPregunta: model.idPregunta },
			model,
			{ returnDocument: 'after' }
		);
		if (!doc) throw new PreguntaNoActualizadaById(model.idPregunta);
		return MapPreguntasMongo.toEntity(doc);
	}

	async getPreguntasPorCategoriaPaginando(
		idCategoria: string,
		pagina: number,
		limit: number
	): Promise<Pregunta[]> {
		const skip = (pagina - 1) * limit;

		const docs = await preguntaModel
			.find({
				categorias: { $in: [idCategoria] },
				respuestas: { $elemMatch: { correcta: true } },
			})
			.skip(skip)
			.limit(limit)
			.lean();
		return docs.map(MapPreguntasMongo.toEntity);
	}

	/**
	 * 
	 * @param idCategoria id interno de la categoria sobre la que hacemos el test
	 * @param pagina numero de pagina sobre la que consultamos (estamos paginando los resultados para no cargar todos en el front)
	 * @param limit numero de respuestas que queremos
	 * @param seed semilla que utilizamo para pseudorandomizar las preguntas, en un mismo test será el mismo
	 * @returns devuelve el numero de preguntas en base a la consulta que se realiza
	 * @remarks Esta funcion es valida para una cantidad de preguntas inferior a 5000, a partir de ahi se puede volver lenta, aunque seria valida
	 * 			hasta los 50.000. A partir de ahí si o si habria que emplear otro sistema como cursores, eliminado el problema que es el skip
	 */
	async getPreguntasPorCategoriaPaginandoConSeed(
		idCategoria: string,
		pagina: number,
		limit: number,
		seed: number
	): Promise<Pregunta[]> {
		const seedNormalizado = seed / 2 ** 32;
		const docs = await preguntaModel.aggregate([
			{
				$match: {
					categorias: { $in: [idCategoria] },
					respuestas: { $elemMatch: { correcta: true } },
					estado: { $ne: "Enterrado" }
				},
			},
			{
				$addFields: {
					ordenRandom: {
						$mod: [
							{
								$add: [
									"$randomKey",
									{ $multiply: [seedNormalizado, 0.6180339887] }
								]
							},
							1
						]
					}
				}
			},
			{ $sort: { ordenRandom: 1 } },
			{ $skip: (pagina - 1) * limit },
			{ $limit: limit },
		]);

		return docs.map(MapPreguntasMongo.toEntity);
	}

	async createPregunta(pregunta: Pregunta): Promise<Pregunta> {
		const modelPregunta = MapPreguntasMongo.toModel(pregunta);;
		const doc = await preguntaModel.create(modelPregunta);
		return MapPreguntasMongo.toEntity(doc);
	}

	async getNumeroPreguntasTotales(): Promise<number> {
		const result = await preguntaModel.find().countDocuments();
		return result;
	}

	async getNumeroPreguntasPorCategoria(idCategoria: string): Promise<number> {
		const result = await preguntaModel
			.find({ categorias: { $in: [idCategoria] } })
			.countDocuments();
		return result;
	}

	async getPreguntasPorCategoria(idCategoria: string): Promise<Pregunta[]> {
		/**
		 * Habria que revisar que todas las respuestas tengan una correcta por lo menos, esto creo que viene de la conversion del excel
		 */
		const query: QueryFilter<IPreguntaDocument> = {
			categorias: { $in: [idCategoria] },
			respuestas: { $elemMatch: { correcta: true } },
		}

		return this.#getPreguntasByQuery(query)
	}

	getAllPreguntas(): Promise<Pregunta[]> {
		throw new Error('Method not implemented.');
	}

	async #getPreguntasByQuery(query: QueryFilter<IPreguntaDocument>): Promise<Pregunta[]> {
		const docs = await preguntaModel.find(query);
		return docs.map(MapPreguntasMongo.toEntity);
	}
}
