import { TRespuesta } from '../types/respuesta.type';
import { v7 as uuid } from "uuid"

export class RespuestaVo {
	readonly #props: TRespuesta;

	private constructor(props: TRespuesta) {
		this.#props = props;
	}

	get enunciado() {
		return this.#props.enunciado;
	}

	get isCorrect() {
		return this.#props.correcta;
	}

	get id() {
		return this.#props.id;
	}

	actualizar(enunciado: string, correcta: boolean){
		this.#props.enunciado = enunciado;
		this.#props.correcta = correcta;
	}

	public static crear(props: Omit<TRespuesta, 'id'> & Partial<Pick<TRespuesta, 'id'>>): RespuestaVo {
		return new RespuestaVo({
			...props,
			id: props.id ?? uuid()
		});
	}
}
