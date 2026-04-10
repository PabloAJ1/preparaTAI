import fs from 'fs';
import PreguntaModel from "../schemas/pregunta.schema";
import { IGrupoPreguntasMongo } from '../interfaces/grupoPreguntas.interface';
import { IGestionBDRepository } from '../../../applications/interfaces/gestionBDRepository.interface';

export class GestionBDGrupoPreguntasRepositoryMongoDB implements IGestionBDRepository {
	constructor(
		private readonly path: string
	){}

	async restore(pathFix? : string): Promise<void> {
		const docs: (IGrupoPreguntasMongo & { _id?: string })[] = JSON.parse(
			fs.readFileSync(pathFix ?? this.path, 'utf-8')
		);
		const operations = docs.map(({ _id: _, ...data }) => ({
			updateOne: {
				filter: { idGrupoPregunta: data.id },
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