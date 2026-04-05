import { IEstadisticasCategoriaDto } from "../../../application/dtos/estadisticas.dto";
import { IPreguntasPort } from "../../../application/interfaces/preguntasPort.interface";
import { Categoria } from "../../../domain/entities/Categoria";
import { IEstadisticasPorCategoria } from "../signatures/getEstadisticasPorCategoria.interface";

export class PreguntaAdapterPort implements IPreguntasPort {
	constructor(
		private readonly getEstadisticasPorCategoria: IEstadisticasPorCategoria
	){}

	async getNumeroPreguntasPorCategoria(categoria: Categoria): Promise<IEstadisticasCategoriaDto> {
		const result = await this.getEstadisticasPorCategoria.exec(categoria.idCategoria);
		return { aciertos: result.aciertos, fallos: result.fallos, numeroPreguntas: result.numeroPreguntas };
	}
}