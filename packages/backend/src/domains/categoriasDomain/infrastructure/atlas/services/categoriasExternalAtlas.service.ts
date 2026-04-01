import { getExternalDb } from "../../../../../shared/infrastructure/db/mongo/atlas.connection";
import { ICategoriaAtlasDto } from "../../adapters/dtos/categoriaAtlas.dto";
import { ICategoriasExternalAtlas } from "../../adapters/interfaces/CategoriasExternalAtlas";

export class CategoriasExternalAtlasService implements ICategoriasExternalAtlas {
	async getAllCategorias(): Promise<ICategoriaAtlasDto[]> {
		const db = await getExternalDb();

		const result = await db
			.collection<ICategoriaAtlasDto>("categorias")
			.find({})
			.toArray();

		return result
	}

}