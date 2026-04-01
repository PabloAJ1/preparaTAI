import { IPreguntasPort } from "../../../application/interfaces/preguntasPort.interface";
import { Categoria } from "../../../domain/entities/Categoria";
import { IGetNumeroPreguntasPorCategoriaPort } from "../signatures/preguntaPort.interface";

export class PreguntaAdapterPort implements IPreguntasPort {
	constructor(
		private readonly getNumeroPreguntasPorCategoriaPort: IGetNumeroPreguntasPorCategoriaPort
	){}

	async getNumeroPreguntasPorCategoria(categoria: Categoria): Promise<number> {
		const result = await this.getNumeroPreguntasPorCategoriaPort.exec(categoria.idCategoria);
		return result;
	}
}