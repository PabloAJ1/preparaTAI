/**
 * Esta clase seleccionara el numero de respuestas que se le van a enviar al usuario,
 * tmabien mezclara las respuestas para que cada vez se le devulevan de forma distinta
 */

import { Pregunta } from '../../domain/entities/Pregunta';
import { RespuestaVo } from '../../domain/valueObjects/RespuestaVo';

export class SelectorRespuestasService {
	static generarRespuestas(pregunta: Pregunta, numeroRespuestas = 4): RespuestaVo[] {
		if(!pregunta.respuestaCorrecta) throw new Error("No hay respuestas correctas para la pregunta")

		const seleccionadas = this.#shuffle([
			...pregunta.respuestasIncorrecta,
		]).slice(0, numeroRespuestas - 1);

		return this.#shuffle([pregunta.respuestaCorrecta, ...seleccionadas]);
	}

	static #shuffle(respuestas: RespuestaVo[]): RespuestaVo[] {
		const arr = [...respuestas];

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}
}
