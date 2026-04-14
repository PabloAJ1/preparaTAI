import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IRegistarEstadisticaByPregunta } from "../signatures/registarEstadisticaByPregunta.interface";

export class RegistarEstadisticaByPregunta implements IRegistarEstadisticaByPregunta {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
	){}

	async exec(idPregunta: string, acierto: boolean): Promise<void>{
		const pregunta = await this.preguntaRepository.getPreguntaById(idPregunta);

		pregunta.estadisticas.registarRespuesta(acierto);
		await this.preguntaRepository.updatePregunta(pregunta)
	}
}