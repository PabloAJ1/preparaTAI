import { Practica } from "../entities/Practicas";

export class CreatePracticaFromData {
	static crearFromDatos(
		preguntas: { idPregunta: string; respuestaCorrectaId: string }[],
		nombrePractica: string
	){
		const respuestasCorrectas = new Map<string, string>();

		for (const p of preguntas) {
			if (!p.respuestaCorrectaId) {
				throw new Error("Pregunta sin respuesta correcta");
			}

			respuestasCorrectas.set(
				p.idPregunta,
				p.respuestaCorrectaId
			);
		}

		return Practica.crear({
			nombrePractica: nombrePractica,
			respuestasCorrectas,
		});
	}
}