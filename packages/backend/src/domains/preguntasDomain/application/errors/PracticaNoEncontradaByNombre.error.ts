export class PracticaNoEncontradaByNombre extends Error {
	constructor(readonly nombrePractica: string) {
		super(`No se ha encontrado la practica con nombre: ${nombrePractica}`);
		this.name = "PracticaNoEncontradaByNombre";
	}
}