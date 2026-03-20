import { RowDataPacket } from 'mysql2';
import { Pregunta } from '../../../domain/entities/Pregunta';
import { IPreguntaRepository } from '../../../domain/repositories/preguntasRepository.interface';
import { pool } from "@/shared/infrastructure/db/mysql/mysql.connection";

export class PreguntaRepositoryMySQL implements IPreguntaRepository {
	async createPregunta(pregunta: Pregunta): Promise<Pregunta> {
		throw new Error('No implementado');
	}

	async getNumeroPreguntasTotales(): Promise<number> {
		const [result] = await pool.query<({total: number} & RowDataPacket)[]>(
			"SELECT COUNT(*) as total FROM ptype"
		);
		return result[0].total;
	}

	async getNumeroPreguntasPorCategoria(nombreCategoria: string): Promise<number> {
		const [result] = await pool.query<({total: number} & RowDataPacket)[]>(
			"SELECT COUNT(*) as total FROM ptype WHERE categoria = ?", 
			[nombreCategoria]
		);
		return result[0].total;
	}

	async getPreguntasPorCategoria(nombreCategoria: string): Promise<Pregunta[]> {
		const [result] = await pool.query<({total: number} & RowDataPacket)[]>(
			"SELECT COUNT(*) as total FROM ptype WHERE categoria = ?", 
			[nombreCategoria]
		);
	}
}
