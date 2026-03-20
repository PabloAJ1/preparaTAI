import { IPreguntaSQL } from "../dtos/preguntaSQL.dto";
import { IPreguntaDto } from "../dtos/pregunta.dto";

export class AgruparPreguntas {
	static agrupar(rows: IPreguntaSQL[]): IPreguntaDto[] {
		const mapa = new Map<string, IPreguntaDto>();

		for (const row of rows) {
			let pregunta = mapa.get(row.idPregunta);
			if (!pregunta) {
				pregunta = {
					id: row.idPregunta,
					enunciado: row.enunciado,
					respuestas: [{
						enunciado: row.respuestaCorrecta,
						correcta: true
					}]
				};

				mapa.set(row.idPregunta, pregunta);
			}

			pregunta.respuestas.push({
				enunciado: row.respuestaIncorrecta,
				correcta: false
			});
		}

		return Array.from(mapa.values());
	}
}