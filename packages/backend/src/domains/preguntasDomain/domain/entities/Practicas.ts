import { TPractica } from "../types/practicas.type";
import { v7 as uuid } from "uuid";

export class Practica {
	readonly #props: TPractica;

	private constructor(
		props: TPractica
	) {
		this.#props = props
	}

	get id() { return this.#props.idPractica }
	get nombrePractica() { return this.#props.nombrePractica }
	get relacionPreguntasRespuestas() { return this.#props.respuestasCorrectas }

	aninadirPreguntas(
		preguntas: { idPregunta: string; respuestaCorrectaId: string }[],
	) {
		const respuestasCorrectas = new Map<string, string>();
		for (const p of preguntas) {
			if (!p.respuestaCorrectaId) {
				throw new Error("Pregunta sin respuesta correcta");
			}

			respuestasCorrectas.set(
				p.idPregunta,
				p.respuestaCorrectaId
			);
		}

		this.#props.respuestasCorrectas = new Map([
			...this.#props.respuestasCorrectas,
			...respuestasCorrectas
		])
	}

	static crear(props: Omit<TPractica, 'idPractica'> & Partial<Pick<TPractica, 'idPractica'>>){
		return new Practica({
			...props,
			idPractica: props.idPractica ?? uuid()
		})
	}
}