import { ELenguaje } from "../enums/lenguaje.enum";
import { TCodigo } from "../types/codigo.type";

export class CodigoVo {
	readonly #props: TCodigo;

	private constructor(props: TCodigo){
		this.#props = props;
	}

	get codigo(): string { return this.#props.codigo }
	get lenguaje(): string { return this.#props.lenguaje }

	static crearDesdeProps(props: TCodigo){
		return new CodigoVo(props);
	}

	static crearConPropiedades(codigo: string, lenguajeStr: string){
		const lenguaje = ELenguaje[lenguajeStr as keyof typeof ELenguaje]; 
		return this.crearDesdeProps({
			codigo: codigo,
			lenguaje: lenguaje ?? ELenguaje.OTROS
		})
	}
}