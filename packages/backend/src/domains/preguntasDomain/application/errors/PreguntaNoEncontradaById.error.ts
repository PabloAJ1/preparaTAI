export class PreguntaNoEncontradaById extends Error {
	constructor(readonly idPregunta: string) {
		super(`No se ha encontrado la pregunta con id: ${idPregunta}`);
		this.name = "PreguntaNoEncontradaById";
	}
}