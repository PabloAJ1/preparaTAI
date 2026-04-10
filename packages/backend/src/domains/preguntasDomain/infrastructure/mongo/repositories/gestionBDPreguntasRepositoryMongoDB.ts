import { IPregunta } from "../interfaces/pregunta.interface";
import fs from 'fs';
import PreguntaModel from "../schemas/pregunta.schema";
import { IGestionBDRepository } from "../../../application/ports/gestionBDRepository.interface";

export class GestionBDPreguntasRepositoryMongoDB implements IGestionBDRepository {
	constructor(
		private readonly path: string
	){}

	async restore(pathFix? : string): Promise<void> {
		const docs: (IPregunta & { _id?: string })[] = JSON.parse(
			fs.readFileSync(pathFix ?? this.path, 'utf-8')
		);
		const operations = docs.map(({ _id: _, ...data }) => ({
			updateOne: {
				filter: { idPregunta: data.idPregunta },
				update: { $set: data },
				upsert: true
			}
		}));

		await PreguntaModel.bulkWrite(operations);

	}

	async backup(pathFix? : string): Promise<void> {
		const docs = await PreguntaModel.find().lean();

		fs.writeFileSync(
			pathFix ?? this.path,
			JSON.stringify(docs, null, 2)
		);
	}

	async limpiarDB(): Promise<void> {
		await PreguntaModel.deleteMany({})
	}
}