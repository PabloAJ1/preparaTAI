import { ICategoriaRepository } from "../../../../../domains/categoriasDomain/domain/repositories/categoriaRepository.interface";
import { Categoria } from "../../../../../domains/categoriasDomain/domain/entities/Categoria";
import { MapCategoriaMongo } from "../mappers/mapCategoriaMongo.mapper";
import CategoriaModel from "../schemas/categoria.schema";
import { ETipoCategoria } from "../../../domain/enums/tipoCategoria.enum";

export class CategoriaRepositoryMongo implements ICategoriaRepository {
	async getCategoriasByType(tipo: ETipoCategoria): Promise<Categoria[]> {
		console.log(tipo.toString());
		console.log("Filtro:", tipo, tipo.toString());
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
	