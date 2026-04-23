import { TPreguntasSession } from '../types/preguntasSession.type';
import { v7 as uuid } from 'uuid';
import seedrandom from 'seedrandom';

export class PreguntaSession {
	#props: TPreguntasSession;

	private constructor(props: TPreguntasSession) {
		this.#props = props;
	}

	obtenerPagina(pagina: number, limite: number) {
		if (pagina < 1 || limite < 1) return [];
		const start = (pagina - 1) * limite;

		if (start >= this.#props.listaPreguntasId.length) return [];
		return this.#props.listaPreguntasId.slice(start, start + limite);
	}

	get id(): string {
		return this.#props.id;
	}

	get listaPreguntasId(): string[] {
		return this.#props.listaPreguntasId;
	}

	get seed(): number {
		return this.#props.seed;
	}

	get createdAt(): Date {
		return this.#props.createdAt;
	}

	static crear(
		props: Omit<TPreguntasSession, 'id'> &
			Partial<Pick<TPreguntasSession, 'id'>>,
	) {
		return new PreguntaSession({
			...props,
			id: props.id ?? uuid(),
			listaPreguntasId: props.id
				? props.listaPreguntasId
				: this.#shuffle(props.listaPreguntasId, props.seed),
		});
	}

	static #shuffle(listaPreguntasId: string[], seed: number): string[] {
		const rng = this.#mulberry32(seed);

		const arr = [...listaPreguntasId];

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(rng() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}

	static #mulberry32(seed: number) {
		return function () {
			let t = (seed += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}
}
