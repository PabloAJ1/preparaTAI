import { ELenguaje } from "../enums/lenguaje.enum";
import { FormateadorCodigoService } from "../services/codeFormat.service";
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

	static crearDesdeProps(props: TCodigo){
		return new CodigoVo(props);
	}

	static async crearConPropiedades(codigo: string, lenguajeStr: string){
		const lenguaje = ELenguaje[lenguajeStr.toLocaleUpperCase() as keyof typeof ELenguaje]; 
		const formateadorCodigoService = new FormateadorCodigoService()
		return this.crearDesdeProps({
			codigo: await formateadorCodigoService.formatear(codigo, lenguaje),
			lenguaje: lenguaje ?? ELenguaje.OTROS
		})
	}
}