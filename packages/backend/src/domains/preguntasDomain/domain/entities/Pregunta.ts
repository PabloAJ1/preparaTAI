import { TPregunta } from '../types/pregunta.type';
import { v7 as uuid } from 'uuid';
import { EstadisticaVO } from '../valueObjects/estadistica.vo';
import { EEstado } from '../enums/estado.enum';
import { RespuestaVo } from '../valueObjects/RespuestaVo';

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
		return this.#props.estado === EEstado.ENTERRADO
	}

	get estado() {
		return this.#props.estado;
	}

	enterrarPregunta(){
		this.#props.estado = EEstado.ENTERRADO
	}

	desenterrarPregunta(){
		this.#props.estado = EEstado.DESENTERRADO
	}

	actualizaPregunta(preguntaModificada: Pregunta) {
		if(this.enunciado.enunciado !== preguntaModificada.enunciado.enunciado)
			this.enunciado.cambiarEnunciado(preguntaModificada.enunciado.enunciado);

		if(preguntaModificada.enunciado.codigo?.codigo && this.enunciado.codigo?.codigo !== preguntaModificada.enunciado.codigo?.codigo)
			this.enunciado.cambiarCodigo(preguntaModificada.enunciado.codigo?.codigo);

		if(this.estado !== preguntaModificada.estado)
			this.#props.estado = preguntaModificada.#props.estado;
		
		const nuevasRespuestas: RespuestaVo[] = []

		for (const r of preguntaModificada.respuestas) {
			if (r.id) {
				const existente = this.respuestas.find(x => x.id === r.id)

				if (!existente) {
					throw new Error("Respuesta inválida")
				}

				existente.actualizar(r.enunciado, r.isCorrect)
				nuevasRespuestas.push(existente)

			} else {
				nuevasRespuestas.push(
					RespuestaVo.crear({
						enunciado: r.enunciado,
						correcta: r.isCorrect
					})
				)
			}
		}

		this.#props.respuestas = nuevasRespuestas	
	}

	public static crear(
		props: Omit<TPregunta, 'idPregunta' | 'estadisticas' | 'estado'> &
			Partial<Pick<TPregunta, 'idPregunta' | 'estadisticas' | 'estado'>>
	) {
		return new Pregunta({
			...props,
			idPregunta: props.idPregunta ?? uuid(),
			estadisticas: props.estadisticas ?? EstadisticaVO.inicializar(),
			estado: props.estado ?? EEstado.MARCADO
		});
	}
}
