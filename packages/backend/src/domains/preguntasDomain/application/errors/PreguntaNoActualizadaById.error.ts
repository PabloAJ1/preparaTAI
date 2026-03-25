export class PreguntaNoActualizadaById extends Error {
	constructor(
		readonly idPregunta: string
	) {
		super(
			`No se ha podido actualizar la pregunta con id: ${idPregunta}.`
		);
		this.name = 'PreguntaNoActualizadaById';
	}
}
