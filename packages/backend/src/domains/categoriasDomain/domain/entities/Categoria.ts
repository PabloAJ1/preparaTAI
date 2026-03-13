import { TCategoria } from '../types/categoria.type';

export class Categoria {
	readonly #props: TCategoria;

	private constructor(props: TCategoria) {
		this.#props = props;
	}

	get nombreCategoria() {
		return this.#props.nombreCategoria;
	}

	public static crear(props: TCategoria): Categoria {
		return new Categoria(props);
	}
}
