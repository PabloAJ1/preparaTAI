import seedrandom from 'seedrandom';
import { Pregunta } from '../../domain/entities/Pregunta';
import { IMezclarPreguntasService } from '../signatures/mezclarPreguntasService,interface';

export class MezclarPreguntasService implements IMezclarPreguntasService {
	mezclarPreguntas(preguntas: Pregunta[], seed: number): Pregunta[] {
		const arr = [...preguntas];
		const rng = seedrandom(seed.toString());

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(rng() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}

	ordenarPorListaIds(
		preguntas: Pregunta[],
		idsOrdenados: string[],
	): Pregunta[] {
		const map = new Map(preguntas.map((p) => [p.idPregunta, p]));

		return idsOrdenados.map((id) => {
			const pregunta = map.get(id);

			if (!pregunta) {
				throw new Error(`Pregunta con id ${id} no encontrada`);
			}

			return pregunta;
		});
	}
}
