import { getExternalDb } from "../../../../../shared/infrastructure/db/mongo/atlas.connection";
import { IPreguntasExternalAtlas } from "../../adapters/interfaces/PreguntasExternalAtlas";
import { IPreguntasAtlasDto } from "../../adapters/dtos/preguntasAtlas.dto";

export class PreguntasExternalAtlasService implements IPreguntasExternalAtlas {
	async getAllPreguntas(): Promise<IPreguntasAtlasDto[]> {
		const db = await getExternalDb();

		const result = await db
			.collection<IPreguntasAtlasDto>("preguntas")
			.find({})
			.toArray();

		return result
	}

}