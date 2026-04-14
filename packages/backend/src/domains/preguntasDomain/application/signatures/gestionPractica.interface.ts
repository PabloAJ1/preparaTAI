export interface IGestionPracticasService {
	gestionarPracticaNuevaOAniadir(
		nombrePractica: string,
		preguntas: { idPregunta: string; respuestaCorrectaId: string }[]
	): Promise<void>
}