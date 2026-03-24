import { Pregunta } from '../../../domain/entities/Pregunta';
import { IPreguntaRepositoryPlano } from '../../../domain/repositories/preguntasRepositoryPlano.interface';

/**
 * Funcion para legacy que pasada una pregunta la convierta en sentencia SQL con la estructura actual de la bd
 * CREATE TABLE IF NOT EXISTS `incorrectas` (
 *   `id` int(11) NOT NULL AUTO_INCREMENT,
 *   `id_pregunta` int(11) NOT NULL,
 *   `respuesta` varchar(1024) NOT NULL,
 *   `justif` varchar(1024) DEFAULT NULL,
 *   PRIMARY KEY (`id`)
 * ) ENGINE=MyISAM AUTO_INCREMENT=4650 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 *
 * CREATE TABLE IF NOT EXISTS `ptype` (
 *   `id` int(11) NOT NULL AUTO_INCREMENT,
 *   `pregunta` varchar(1024) NOT NULL,
 *   `respuesta` varchar(1024) NOT NULL,
 *   `justif` varchar(1024) DEFAULT NULL,
 *   `img_path` varchar(255) DEFAULT NULL,
 *   `categoria` varchar(255) DEFAULT NULL,
 *   `bloque` tinyint(4) DEFAULT NULL,
 *   `tema` tinyint(4) DEFAULT NULL,
 *   PRIMARY KEY (`id`)
 * ) ENGINE=MyISAM AUTO_INCREMENT=1628 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 *
 * Como la idea es poder crear las sql con desconocimiento del ID vamos a partir de un id alto
 */

let INDICE = 9999;

export class PreguntasSQLService implements IPreguntaRepositoryPlano {
	crear(preguntas: Pregunta[]): string[] {
		const result = [];

		for (const pregunta of preguntas) {
			const idPregunta = INDICE++;
			const correcta = pregunta.respuestaCorrecta?.enunciado || '';

			result.push(
				`INSERT IGNORE INTO ptype (id, pregunta, respuesta, categoria) VALUES ('${idPregunta}','${this.#escapeSQL(
					pregunta.enunciado
				)}','${this.#escapeSQL(correcta)}','2026')`
			);
			pregunta.respuestasIncorrecta.forEach((r) => {
				result.push(
					`INSERT IGNORE INTO incorrectas (id_pregunta, respuesta) VALUES ('${idPregunta}', '${this.#escapeSQL(
						r.enunciado
					)}')`
				);
			});
		}

		return result;
	}

	#escapeSQL(str: string) {
		if (str === undefined) return '';
		return str.toString().replaceAll("'", "''");
	}
}
