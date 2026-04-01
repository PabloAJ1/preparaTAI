import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { ICategoriasSyncPort } from "../interfaces/categoriasSyncPort.interface";
import { MapCategoria } from "../mappers/mapCategorias.mapper";
import { IInicializarCategorias } from "../signatures/inicializarCategorias.interface";

export class InicializarCategorias implements IInicializarCategorias {
	constructor(
		private readonly categoriasSyncPortService: ICategoriasSyncPort,
		private readonly categoriasRepositories: ICategoriaRepository,
	){}

	async exec(options: { clearDB: boolean  } = { clearDB: false }): Promise<void> {
		const categoriasExternas = await this.categoriasSyncPortService.readAllCategorias()
		const categoriasEntities = categoriasExternas.map(MapCategoria.toEntityWithId);
		if(options.clearDB){
			await this.categoriasRepositories.limpiarDB()
		}
			
		await this.categoriasRepositories.createBulkPreguntas(categoriasEntities)
	}
}