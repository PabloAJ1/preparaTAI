import { TRespuesta } from '../types/respuesta.type';

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

	public static crear(props: TRespuesta): RespuestaVo {
		return new RespuestaVo(props);
	}
}
