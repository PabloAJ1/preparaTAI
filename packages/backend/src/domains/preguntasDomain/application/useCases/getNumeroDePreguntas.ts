import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IGetNumeroPreguntas } from "../signatures/getNumeroPreguntas.interface";

export class GetNumeroPreguntas implements IGetNumeroPreguntas {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository
	){}

	async exec(): Promise<number> {
		const numeropreguntas = await this.preguntaRepository.getNumeroPreguntasTotales();
		return numeropreguntas;
	}
}