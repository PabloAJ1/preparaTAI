import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IDesenterrarPreguntas } from "../signatures/desenterrarPreguntas.interface";

export class DesenterrarPreguntas implements IDesenterrarPreguntas {
	constructor(private readonly preguntaRepository: IPreguntaRepository) {}

	async exec(): Promise<void> {
		const preguntasEnterradas = await this.preguntaRepository.getPreguntasEnterradas();
		for(const enterrada of preguntasEnterradas){
			enterrada.desenterrarPregunta();
			await this.preguntaRepository.updatePreguntaById(enterrada);
		}
	}

}