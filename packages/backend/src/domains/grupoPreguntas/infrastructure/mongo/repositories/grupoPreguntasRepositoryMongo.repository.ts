import { GrupoPreguntaNoEncontradaById } from "../../../applications/errors/GrupoPreguntaNoEncontradaById.error";
import { GrupoPreguntas } from "../../../domain/entities/GrupoPreguntas";
import { ELenguaje } from "../../../domain/enums/lenguaje.enum";
import { IGrupoPreguntasRepository } from "../../../domain/repositories/grupoPreguntas.interface";
import { MapPreguntasMongo } from "../mappers/mapPreguntasMongo.mapper";
import preguntaModel, { IGrupoPreguntaDocument } from "../schemas/pregunta.schema";

export class GrupoPreguntasRepositoryMongo implements IGrupoPreguntasRepository {
	async getGrupoPreguntasByIdCategoria(id: string): Promise<GrupoPreguntas[]> {
		const docs = await preguntaModel.find({ idGrupoPregunta: id});
		return await this.#toEntityConjunto(docs) 
	}

	async getAllGrupoPreguntas(): Promise<GrupoPreguntas[]> {
		const docs = await preguntaModel.find({});
		return await this.#toEntityConjunto(docs) 
	}

	async getGrupoPreguntasById(id: string): Promise<GrupoPreguntas> {
		const doc = await preguntaModel.findOne({id: id}).lean();
		if(!doc) throw new GrupoPreguntaNoEncontradaById(id)
		return MapPreguntasMongo.toEntity(doc);
	}

	async getGrupoPreguntasByLenguaje(lenguaje: ELenguaje): Promise<GrupoPreguntas[]> {
		const docs = await preguntaModel.find({ "codigo.lenguaje": lenguaje });
		return await this.#toEntityConjunto(docs) 
	}

	async createGrupoPreguntas(grupo: GrupoPreguntas): Promise<GrupoPreguntas> {
		const grupoModel = MapPreguntasMongo.toModel(grupo);
		const doc = await preguntaModel.create(grupoModel);
		return await this.#toEntity(doc);
	}

	async #toEntity(model: IGrupoPreguntaDocument): Promise<GrupoPreguntas>{
		return await MapPreguntasMongo.toEntity(model);
	}

	async #toEntityConjunto(grupoModelos: IGrupoPreguntaDocument[]): Promise<GrupoPreguntas[]>{
		const retArray = [];
		for(const model of grupoModelos){
			retArray.push(await this.#toEntity(model))
		}

		return retArray;
	}
}