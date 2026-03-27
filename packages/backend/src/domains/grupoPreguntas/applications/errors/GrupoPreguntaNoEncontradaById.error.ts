export class GrupoPreguntaNoEncontradaById extends Error {
	constructor(readonly idPregunta: string) {
		super(`No se ha encontrado el grupo de preguntas con id: ${idPregunta}`);
		this.name = "GrupoPreguntaNoEncontradaById";
	}
}