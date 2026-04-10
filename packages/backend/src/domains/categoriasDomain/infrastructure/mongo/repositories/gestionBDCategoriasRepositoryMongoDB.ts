import { IGestionBDRepository } from "../../../application/interfaces/gestionBDRepository.interface";
import { ICategoria } from "../interfaces/categoria.interface";
import CategoriaModel from "../schemas/categoria.schema";
import fs from 'fs';

export class GestionBDCategoriasRepositoryMongoDB implements IGestionBDRepository {
	constructor(
		private readonly path: string
	){}

	async restore(pathFix? : string): Promise<void> {
		const docs: (ICategoria & { _id?: string })[] = JSON.parse(
			fs.readFileSync(pathFix ?? this.path, 'utf-8')
		);
		const operations = docs.map(({ _id: _, ...data }) => ({
			updateOne: {
				filter: { idCategoria: data.idCategoria },
				update: { $set: data },
				upsert: true
			}
		}));

		await CategoriaModel.bulkWrite(operations);

	}

	async backup(pathFix? : string): Promise<void> {
		const docs = await CategoriaModel.find().lean();

		fs.writeFileSync(
			pathFix ?? this.path,
			JSON.stringify(docs, null, 2)
		);
	}

	async limpiarDB(): Promise<void> {
		await CategoriaModel.deleteMany({})
	}
}