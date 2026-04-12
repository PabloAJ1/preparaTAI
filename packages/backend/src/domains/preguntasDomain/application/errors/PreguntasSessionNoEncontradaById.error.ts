export class PreguntasSessionNoEncontradaBySeed extends Error {
	constructor(readonly seed: number) {
		super(`No se ha encontrado la sesion con id: ${seed}`);
		this.name = "PreguntasSessionNoEncontradaBySeed";
	}
}