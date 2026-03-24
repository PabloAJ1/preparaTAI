import { IPreguntaSQL } from "../dtos/preguntaSQL.dto";
import { IPreguntaDto } from "../dtos/pregunta.dto";

export class AgruparPreguntas {
	static agrupar(rows: IPreguntaSQL[]): IPreguntaDto[] {
		const mapa = new Map<string, IPreguntaDto>();

		for (const row of rows) {
			let pregunta = mapa.get(row.idPregunta);
			if (!pregunta) {
				pregunta = {
					categoria: row.categoria,
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

		const array = Array.from(mapa.values());

		function shuffle(mapa: IPreguntaDto[]): void {
			mapa.forEach(respuestas => {
				for (let i = respuestas.respuestas.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[respuestas.respuestas[i], respuestas.respuestas[j]] = [respuestas.respuestas[j], respuestas.respuestas[i]];
				}
			})			
		}
		shuffle(array)

		return array
	}
}