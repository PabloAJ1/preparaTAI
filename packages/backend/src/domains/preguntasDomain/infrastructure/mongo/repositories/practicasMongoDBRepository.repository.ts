import { PreguntaNoEncontradaById } from "../../../application/errors/PreguntaNoEncontradaById.error";
import { Practica } from "../../../domain/entities/Practicas";
import { IPracticaRepository } from "../../../domain/repositories/practicaRepository.interface";
import { IPractica } from "../interfaces/practica.interface";
import PracticaModel from "../schemas/practica.schema";

export class PracticasMongoDBRepository implements IPracticaRepository {
	async getPracticaPorNombre(nombrePractica: string): Promise<Practica> {
		const doc = await PracticaModel.findOne({ nombrePractica: nombrePractica}).lean()
		if(!doc) throw new PreguntaNoEncontradaById(nombrePractica) //Esto hay que crear el error para manejarlo mejor
		return this.#toEntity(doc);
	}
	
	async updatePractica(practica: Practica): Promise<void> {
		const doc = await PracticaModel.findOneAndUpdate(
			{ idPractica: practica.id },
			this.#toModel(practica),
			{ returnDocument: 'after' },
		)
		if(!doc) throw new Error("No se ha encontrado el id de la practica") //Esto hay que crear el error para manejarlo mejor
	}

	async getAllPracticas(): Promise<Practica[]> {
		const doc = await PracticaModel.find({}).lean()
		return doc.map(this.#toEntity);
	}

	async getPracticaPorId(idPractica: string): Promise<Practica> {
		const doc = await PracticaModel.findOne({ idPractica: idPractica}).lean()
		if(!doc) throw new Error("No se ha encontrado el id de la practica") //Esto hay que crear el error para manejarlo mejor
		return this.#toEntity(doc);
	}

	async createPractica(practica: Practica): Promise<void> {
		const practicaMapeada = this.#toModel(practica);
		await PracticaModel.create(practicaMapeada);
	}

	#toModel(entity: Practica): IPractica{
		return {
			idPractica: entity.id,
			nombrePractica: entity.nombrePractica,
			respuestasCorrectas: Object.fromEntries(entity.relacionPreguntasRespuestas)
		}
	}

	#toEntity(doc: IPractica): Practica {
			return Practica.crear({
				idPractica: doc.idPractica,
				nombrePractica: doc.nombrePractica,
				respuestasCorrectas: new Map(
					Object.entries(doc.respuestasCorrectas)
				)
		});
	}
}