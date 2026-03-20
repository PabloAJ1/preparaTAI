import { Categoria } from "@/domains/categoriasDomain/domain/entities/Categoria";
import { ICategoriaRepository } from "@/domains/categoriasDomain/domain/repositories/categoriaRepository.interface";
import { pool } from "@/shared/infrastructure/db/mysql/mysql.connection";
import { RowDataPacket } from "mysql2";
import { MapCategoria } from "../mappers/mapCategoria.mapper";

export class CategoriasMySQLRepository implements ICategoriaRepository {
	async getAllCategorias(): Promise<Categoria[]> {
		return await this.#getAllCategoriasWithFilter("");
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
		return result.map(MapCategoria.toEntityNew)
	}
}