import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IEnterrarPregunta } from "../signatures/enterrarPregunta.interface";

export class EnterrarPregunta implements IEnterrarPregunta {
	constructor(private readonly preguntaRepository: IPreguntaRepository) {}
	
	async exec(idPregunta: string): Promise<void> {
		const pregunta = await this.preguntaRepository.getPreguntaById(idPregunta);
		pregunta.enterrarPregunta();
		await this.preguntaRepository.updatePregunta(pregunta);
	}
}