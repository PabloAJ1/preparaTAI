import { ICategoriaRepository } from "../../../../../domains/categoriasDomain/domain/repositories/categoriaRepository.interface";
import { Categoria } from "../../../../../domains/categoriasDomain/domain/entities/Categoria";
import { MapCategoriaMongo } from "../mappers/mapCategoriaMongo.mapper";
import CategoriaModel from "../schemas/categoria.schema";
import { ETipoCategoria } from "../../../domain/enums/tipoCategoria.enum";
import { CategoriaNoEncontradaById } from "../../../application/errors/CategoriaNoEncontradaById.error";

export class CategoriaRepositoryMongo implements ICategoriaRepository {
	async createBulkPreguntas(categoria: Categoria[]): Promise<void> {
		const categoriasModel = categoria.map(MapCategoriaMongo.toModel)
		
		const operaciones = categoriasModel.map((categoria) => ({
			updateOne: {
				filter: { idCategoria: categoria.idCategoria },
				update: { $set: categoria },
				upsert: true
			}
		}));

		await CategoriaModel.bulkWrite(operaciones);
	}

	async limpiarDB(): Promise<void> {
		await CategoriaModel.deleteMany({})
	}

	async getCategoriasById(idCategoria: string): Promise<Categoria> {
		const doc = await CategoriaModel.findOne({ idCategoria: idCategoria });
		if(!doc) throw new CategoriaNoEncontradaById(idCategoria);
		return MapCategoriaMongo.toEntity(doc)
	}

	async getCategoriasByType(tipo: ETipoCategoria): Promise<Categoria[]> {
		const docs = await CategoriaModel.find({ tipo: tipo.toString() });
		return docs.map(MapCategoriaMongo.toEntity)
	}

	async getAllCategoriasExamenes(): Promise<Categoria[]> {
		const docs = await CategoriaModel.find({ nombreCategoria: /^Examen-/ });
		return docs.map(MapCategoriaMongo.toEntity)
	}

	async getListOfCategorias(listaCategorias: string[]): Promise<Categoria[]> {
		const docs = await CategoriaModel.find({ nombreCategoria: { $in: listaCategorias }});
		return docs.map(MapCategoriaMongo.toEntity)
	}

	async createListOfCategorias(listaCategorias: Categoria[]): Promise<Categoria[]> {
		const listaCategoriasModels = listaCategorias.map(MapCategoriaMongo.toModel)
		const docs = await CategoriaModel.insertMany(listaCategoriasModels, { ordered: false })
		return docs.map(MapCategoriaMongo.toEntity)
	}

	async createCategoria(categoria: Categoria): Promise<Categoria> {
		const categoriaModel = MapCategoriaMongo.toModel(categoria);
		const doc = await CategoriaModel.create(categoriaModel);

		console.log(doc);

		return MapCategoriaMongo.toEntity(doc);
	}

	async getAllCategorias(): Promise<Categoria[]> {
		const docs = await CategoriaModel.find({});
		return docs.map(MapCategoriaMongo.toEntity)
	}

	async getAllCategoriasNoCuestionarios(): Promise<Categoria[]> {
		const docs = await CategoriaModel.find({ nombreCategoria: { $not: /CUESTIONARIO/ } });
		return docs.map(MapCategoriaMongo.toEntity)
	}
	async getAllCategoriasCuestionarios(): Promise<Categoria[]> {
		const docs = await CategoriaModel.find({ nombreCategoria: /CUESTIONARIO/ });
		return docs.map(MapCategoriaMongo.toEntity)
	}
}
	