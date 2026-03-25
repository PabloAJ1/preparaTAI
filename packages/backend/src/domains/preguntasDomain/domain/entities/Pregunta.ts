import { TPregunta } from '../types/pregunta.type';
import { v7 as uuid } from 'uuid';
import { EstadisticaVO } from '../valueObjects/estadistica.vo';

export class Pregunta {
	readonly #props: TPregunta;

	private constructor(props: TPregunta) {
		this.#props = props;
	}

	get enunciado() {
		return this.#props.enunciado;
	}

	get respuestas() {
		return this.#props.respuestas;
	}

	get respuestaCorrecta() {
		return this.respuestas.find((r) => r.isCorrect);
	}

	get respuestasIncorrecta() {
		return this.respuestas.filter((r) => !r.isCorrect);
	}

	get idPregunta() {
		return this.#props.idPregunta;
	}

	get categorias(){
		return this.#props.categorias
	}

	get estadisticas(){
		return this.#props.estadisticas;
	}

	public static crear(
		props: Omit<TPregunta, 'idPregunta' | 'estadisticas'> &
			Partial<Pick<TPregunta, 'idPregunta' | 'estadisticas'>>
	) {
		return new Pregunta({
			...props,
			idPregunta: props.idPregunta ?? uuid(),
			estadisticas: props.estadisticas ?? EstadisticaVO.inicializar()
		});
	}
}
