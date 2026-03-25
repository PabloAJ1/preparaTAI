import { ETipoCategoria } from '../enums/tipoCategoria.enum';
import { TCategoria } from '../types/categoria.type';
import { v7 as uuid } from "uuid";

export class Categoria {
	readonly #props: TCategoria;

	private constructor(props: TCategoria) {
		this.#props = props;
	}

	get nombreCategoria() {
		return this.#props.nombreCategoria;
	}

	get idCategoria() {
		return this.#props.idCategoria;
	}

	get tipoCategoriaString() {
		return this.#props.tipo.toString()
	}

	public static crear(props: Omit<TCategoria, 'idCategoria' | 'tipo'> & Partial<Pick<TCategoria, 'idCategoria' | 'tipo'>>): Categoria {
		return new Categoria({
			...props,
			idCategoria: props.idCategoria ?? uuid(),
			tipo: props.tipo ?? ETipoCategoria.DEFAULT
		});
	}
}
