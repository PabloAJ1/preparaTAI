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

	public static crear(props: Omit<TCategoria, 'idCategoria'> & Partial<Pick<TCategoria, 'idCategoria'>>): Categoria {
		return new Categoria({
			...props,
			idCategoria: props.idCategoria ?? uuid()
		});
	}
}
