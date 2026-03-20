import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IGetNumeroPreguntasPorCategoria } from "../signatures/getNumeroPreguntasPorCategoria.interface";

export class GetNumeroPreguntasPorCategoria implements IGetNumeroPreguntasPorCategoria {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository
	){}

	async exec(nombreCategoria: string): Promise<number> {
		const result = await this.preguntaRepository.getNumeroPreguntasPorCategoria(nombreCategoria);
		return result;
	}
}