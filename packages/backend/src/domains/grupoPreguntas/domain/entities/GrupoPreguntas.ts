import { TGrupoPreguntas } from '../types/grupoPreguntas.type';
import { v7 as uuid } from "uuid";

export class GrupoPreguntas {
	readonly #props: TGrupoPreguntas;

	private constructor(props: TGrupoPreguntas) {
		this.#props = props;
	}

	get idGrupoPreguntas(){
		return this.#props.id;
	}
	get codigo() {
		return this.#props.codigo;
	}
	get textoPre() {
		return this.#props.textoPre;
	}
	get textoPos() {
		return this.#props.textoPos;
	}
	get preguntas() {
		return this.#props.idsPreguntas;
	}

	static crear(props: Omit<TGrupoPreguntas, 'id'> & Partial<Pick<TGrupoPreguntas, 'id'>>): GrupoPreguntas {
		return new GrupoPreguntas({
			...props,
			id: props.id ?? uuid()
		});
	}
}
