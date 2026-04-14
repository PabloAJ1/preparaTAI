import { RowDataPacket } from 'mysql2';
import { Pregunta } from '../../../domain/entities/Pregunta';
import { IPreguntaRepository } from '../../../domain/repositories/preguntasRepository.interface';
import { pool } from "../../../../../shared/infrastructure/db/mysql/mysql.connection";
import { AgruparPreguntas } from '../services/agruparPreguntas.service';
import { IPreguntaSQL } from '../dtos/preguntaSQL.dto';
import { MapPreguntas } from '../mappers/mapPreguntas.mapper';

export class PreguntaRepositoryMySQL implements IPreguntaRepository {
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
		const [result] = await pool.query<IPreguntaSQL[]>(
			`SELECT *
			FROM (
				SELECT 
					p.id AS idPregunta,
					p.pregunta AS enunciado,
					p.respuesta AS respuestaCorrecta,
					i.respuesta AS respuestaIncorrecta,
					ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY i.respuesta) AS rn
				FROM ptype p
				INNER JOIN incorrectas i
					ON p.id = i.id_pregunta
				WHERE p.categoria = ?
			) t
			WHERE t.rn <= 3;  -- Limita a 3 incorrectas por pregunta`, 
			[nombreCategoria]
		);

		const preguntasDto = AgruparPreguntas.agrupar(result)
		return preguntasDto.map(MapPreguntas.toEntity)
	}

	async getAllPreguntas(): Promise<Pregunta[]> {
		const [result] = await pool.query<IPreguntaSQL[]>(
			`SELECT 
				p.id AS idPregunta,
				p.pregunta AS enunciado,
				p.respuesta AS respuestaCorrecta,
				i.respuesta AS respuestaIncorrecta,
				p.categoria AS categoria,
				p.bloque AS bloque,
				p.tema AS tema,
				p.justif AS justificacion
			FROM ptype AS p
			INNER JOIN incorrectas AS i
				ON p.id = i.id_pregunta
			UNION
			SELECT 
				p.id + 10000 AS idPregunta,
				p.pregunta AS enunciado,
				p.respuesta AS respuestaCorrecta,
				i.respuesta AS respuestaIncorrecta,
				p.categoria AS categoria,
				p.bloque AS bloque,
				p.tema AS tema,
				"" AS justificacion
			FROM rtype AS p
			INNER JOIN rtype AS i
				ON p.categoria = i.categoria
			WHERE p.id != i.id and p.respuesta != i.respuesta`
		);

		const preguntasDto = AgruparPreguntas.agrupar(result)
		return preguntasDto.map(MapPreguntas.toEntity)
	}

	getPreguntaById(idPregunta: string): Promise<Pregunta> {
		throw new Error('Method not implemented.');
	}
	updatePregunta(pregunta: Pregunta): Promise<Pregunta> {
		throw new Error('Method not implemented.');
	}
	getPreguntasPorCategoriaPaginando(idCategoria: string, pagina: number, limit: number): Promise<Pregunta[]> {
		throw new Error('Method not implemented.');
	}
	createPregunta(pregunta: Pregunta): Promise<Pregunta> {
		throw new Error('No implementado');
	}
	reiniciarAllEstadisticas(): Promise<void> {
		throw new Error('No implementado');
	}
	getPreguntasMarcadasParaRevisar(): Promise<Pregunta[]> {
		throw new Error('Method not implemented.');
	}
	getNumeroPreguntasAciertosYFallosPorCateogira(idCategoria: string): Promise<{ numeroPreguntas: number; aciertos: number; fallos: number; }> {
		throw new Error('Method not implemented.');
	}
	getVariasPreguntasPorIds(idsPreguntas: string[]): Promise<Pregunta[]> {
		throw new Error('Method not implemented.');
	}
	createBulkPreguntas(preguntas: Pregunta[]): Promise<void> {
		throw new Error('Method not implemented.');
	}
	limpiarDB(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	getPreguntasEnterradas(): Promise<Pregunta[]> {
		throw new Error('Method not implemented.');
	}
	getPreguntasPorCategoriaPaginandoConSeed(idCategoria: string, pagina: number, limit: number, seed: number): Promise<Pregunta[]> {
		throw new Error('Method not implemented.');
	}
}