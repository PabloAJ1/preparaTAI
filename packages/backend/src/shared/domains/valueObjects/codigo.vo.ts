import { ELenguaje } from "../enums/lenguaje.enum";
import { TCodigo } from "../types/codigo.type";

export class CodigoVo {
	readonly #props: TCodigo;

	private constructor(
		props: TCodigo
	){
		this.#props = props;
	}

	get codigo(): string { return this.#props.codigo }
	get lenguaje(): string { return this.#props.lenguaje }

	cambiarCodigo(nuevoCodigo: string){
		if (!nuevoCodigo.trim()) {
			throw new Error("El codigo no puede estar vacío");
		}

		this.#props.codigo = nuevoCodigo;
	}

	static crearDesdeProps(props: Omit<TCodigo, 'lenguaje'> & Partial<Pick<TCodigo, 'lenguaje'>>){
		return new CodigoVo({
			...props,
			lenguaje: props.lenguaje ?? ELenguaje.OTROS
		});
	}
}