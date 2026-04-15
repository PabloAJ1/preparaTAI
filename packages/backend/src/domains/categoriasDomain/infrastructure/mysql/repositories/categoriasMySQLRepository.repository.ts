import { Categoria } from "../../../../../domains/categoriasDomain/domain/entities/Categoria";
import { ICategoriaRepository } from "../../../../../domains/categoriasDomain/domain/repositories/categoriaRepository.interface";
import { pool } from "../../../../../shared/infrastructure/db/mysql/mysql.connection";
import { RowDataPacket } from "mysql2";
import { MapCategoria } from "../mappers/mapCategoria.mapper";
import { ETipoCategoria } from "../../../domain/enums/tipoCategoria.enum";

export class CategoriasMySQLRepository implements ICategoriaRepository {
	getByIds(idsCategorias: string[]): Promise<Categoria[]> {
		throw new Error("Method not implemented.");
	}
	getCategoriasByName(nombreCategoria: string): Promise<Categoria> {
		throw new Error("Method not implemented.");
	}
	createBulkPreguntas(categoria: Categoria[]): Promise<void> {
		throw new Error("Method not implemented.");
	}
	limpiarDB(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	getCategoriasById(idCategoria: string): Promise<Categoria> {
		throw new Error("Method not implemented.");
	}
	getCategoriasByType(tipo: ETipoCategoria): Promise<Categoria[]> {
		throw new Error("Method not implemented.");
	}
	getAllCategoriasExamenes(): Promise<Categoria[]> {
		throw new Error("Method not implemented.");
	}
	getListOfCategorias(listaCategorias: string[]): Promise<Categoria[]> {
		throw new Error("Method not implemented.");
	}
	createListOfCategorias(listaCategorias: Categoria[]): Promise<Categoria[]> {
		throw new Error("Method not implemented.");
	}
	async getAllCategorias(): Promise<Categoria[]> {
		const categoriasRType = await this.#getAllCategoriasRTypeWithFilter()
		const categoriasPType = await this.#getAllCategoriasWithFilter("")
		
		return categoriasRType.concat(categoriasPType)
	}
	
	async getAllCategoriasCuestionarios(): Promise<Categoria[]> {
		return await this.#getAllCategoriasWithFilter(" WHERE categoria LIKE '%CUESTIONARIO%'");
	}

	async getAllCategoriasNoCuestionarios(): Promise<Categoria[]> {
		return await this.#getAllCategoriasWithFilter(" WHERE categoria NOT LIKE '%CUESTIONARIO%'");
	}

	async #getAllCategoriasWithFilter(filter: string): Promise<Categoria[]>{
		const [result] = await pool.query<({nombreCategoria: string} & RowDataPacket)[]>(
			"SELECT DISTINCT categoria as nombreCategoria FROM ptype" + filter
		);
		return result.map(categoria => MapCategoria.toEntityNew(categoria, false));
	}

	async #getAllCategoriasRTypeWithFilter(): Promise<Categoria[]> {
		const [result] = await pool.query<({nombreCategoria: string} & RowDataPacket)[]>(
			"SELECT DISTINCT categoria as nombreCategoria FROM rtype"
		);
		return result.map(categoria => MapCategoria.toEntityNew(categoria, true));

	}

	async createCategoria(categoria: Categoria): Promise<Categoria> {
		throw new Error("No implementado")
	}
}