import { IPreguntasPort } from "@/domains/categoriasDomain/application/interfaces/preguntasPort.interface";
import { Categoria } from "@/domains/categoriasDomain/domain/entities/Categoria";
import { IGetNumeroPreguntasPorCategoriaPort } from "../signatures/preguntaPort.interface";

export class PreguntaAdapterPort implements IPreguntasPort {
	constructor(
		private readonly getNumeroPreguntasPorCategoriaPort: IGetNumeroPreguntasPorCategoriaPort
	){}

	async getNumeroPreguntasPorCategoria(categoria: Categoria): Promise<number> {
		const result = await this.getNumeroPreguntasPorCategoriaPort.exec(categoria.nombreCategoria);
		return result;
	}
}