import { Categoria } from "../../domain/entities/Categoria";
import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { IMigracionCategorias } from "../signatures/migracionCategorias.interface";

export class MigracionCategorias implements IMigracionCategorias {
	constructor(
		private readonly categoriasRepositoryOrigin: ICategoriaRepository,
		private readonly categoriasRepositoryDestiny: ICategoriaRepository
	){}

	async exec(): Promise<void> {
		const categorias = await this.categoriasRepositoryOrigin.getAllCategorias();
		for(const cat of categorias){
			await this.categoriasRepositoryDestiny.createCategoria(cat)
		}
	}
}