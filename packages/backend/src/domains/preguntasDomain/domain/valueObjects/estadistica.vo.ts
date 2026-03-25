import { TEstadistica } from "../types/estadistica.type";

export class EstadisticaVO {
	readonly #props: TEstadistica

	private constructor(
		props: TEstadistica
	){
		this.#props = props
	}

	get total() { return this.#props.total }
	get aciertos() { return this.#props.aciertos }
	get fallos() { return this.#props.fallos }

	registarRespuesta(acierto: boolean){
		this.#props.total++;
		if(acierto) this.#props.aciertos++;
		else this.#props.fallos++;
	}

	static crear(props: TEstadistica){
		return new EstadisticaVO({
			aciertos: props.aciertos,
			fallos: props.fallos,
			total: props.total
		})
	}

	static inicializar(){
		return this.crear({
			aciertos: 0,
			fallos: 0,
			total: 0
		})
	}
}