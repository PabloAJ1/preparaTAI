import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IReiniciarEstadisticas } from "../signatures/reiniciarEstadisticas.interface";

export class ReiniciarEstadisticas implements IReiniciarEstadisticas {
	constructor(
			private readonly preguntaRepository: IPreguntaRepository,
		){}

	async exec(): Promise<void> {
		await this.preguntaRepository.reiniciarAllEstadisticas();
	}
}