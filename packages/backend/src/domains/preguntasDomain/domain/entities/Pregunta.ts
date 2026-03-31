import { TPregunta } from '../types/pregunta.type';
import { v7 as uuid } from 'uuid';
import { EstadisticaVO } from '../valueObjects/estadistica.vo';
import { EEstado } from '../enums/estado.enum';

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

	get isDescartada(): boolean {
		return this.#props.descartada;
	}

	get estado() {
		return this.#props.estado;
	}

	cambiarEnunciado(nuevoEnunciado: string){
		if (!nuevoEnunciado.trim()) {
			throw new Error("El enunciado no puede estar vacío");
		}

		this.#props.enunciado = nuevoEnunciado;
	}

	enterrarPregunta(){
		this.#props.descartada = true;
	}

	desenterrarPregunta(){
		this.#props.descartada = false;
	}

	public static crear(
		props: Omit<TPregunta, 'idPregunta' | 'estadisticas' | 'descartada' | 'estado'> &
			Partial<Pick<TPregunta, 'idPregunta' | 'estadisticas' | 'descartada' | 'estado'>>
	) {
		return new Pregunta({
			...props,
			idPregunta: props.idPregunta ?? uuid(),
			estadisticas: props.estadisticas ?? EstadisticaVO.inicializar(),
			descartada: props.descartada ?? false,
			estado: props.estado ?? EEstado.REVISADO
		});
	}
}
