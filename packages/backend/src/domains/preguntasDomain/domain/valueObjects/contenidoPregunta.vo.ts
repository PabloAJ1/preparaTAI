import { TContenidoPregunta } from "../types/contenidoPregunta.type";

export class ContenidoPregunta {
	#props : TContenidoPregunta;

	private constructor(
		props: TContenidoPregunta
	){
		this.#props = props;
	}

	get enunciado(): string { return this.#props.enunciado }
	get codigo() { return this.#props.codigo }
	get imagen() { return this.#props.imagen }

	cambiarEnunciado(nuevoEnunciado: string){
		if (!nuevoEnunciado.trim()) {
			throw new Error("El enunciado no puede estar vacío");
		}

		this.#props.enunciado = nuevoEnunciado;
	}

	cambiarCodigo(nuevoCodigo: string){
		if (!nuevoCodigo.trim()) {
			throw new Error("El codigo no puede estar vacío");
		}

		this.#props.codigo?.cambiarCodigo(nuevoCodigo);
	}

	static crearPregunta(props: TContenidoPregunta){
		return new ContenidoPregunta({
			enunciado: props.enunciado,
			codigo: props?.codigo,
			imagen: props?.imagen
		})
	}
}