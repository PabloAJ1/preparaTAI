import { GrupoPreguntaNoEncontradaById } from "../../../applications/errors/GrupoPreguntaNoEncontradaById.error";
import { GrupoPreguntas } from "../../../domain/entities/GrupoPreguntas";
import { ELenguaje } from "../../../domain/enums/lenguaje.enum";
import { IGrupoPreguntasRepository } from "../../../domain/repositories/grupoPreguntas.interface";
import { MapPreguntasMongo } from "../mappers/mapPreguntasMongo.mapper";
import preguntaModel from "../schemas/pregunta.schema";

export class GrupoPreguntasRepositoryMongo implements IGrupoPreguntasRepository {
	async getAllGrupoPreguntas(): Promise<GrupoPreguntas[]> {
		const docs = await preguntaModel.find({});
		return docs.map(MapPreguntasMongo.toEntity);
	}

	async getGrupoPreguntasById(id: string): Promise<GrupoPreguntas> {
		const doc = await preguntaModel.findOne({id: id}).lean();
		if(!doc) throw new GrupoPreguntaNoEncontradaById(id)
		return MapPreguntasMongo.toEntity(doc);
	}

	async getGrupoPreguntasByLenguaje(lenguaje: ELenguaje): Promise<GrupoPreguntas[]> {
		const docs = await preguntaModel.find({ "codigo.lenguaje": lenguaje });
		return docs.map(MapPreguntasMongo.toEntity);
	}

	async createGrupoPreguntas(grupo: GrupoPreguntas): Promise<GrupoPreguntas> {
		const grupoModel = MapPreguntasMongo.toModel(grupo);
		const doc = await preguntaModel.create(grupoModel);
		return MapPreguntasMongo.toEntity(doc);
	}
}