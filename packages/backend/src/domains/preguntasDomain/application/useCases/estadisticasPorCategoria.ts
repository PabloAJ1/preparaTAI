import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IEstadisticasPorCategoriaDto } from "../dtos/estadisticasPorCategoria.dto";
import { IEstadisticasPorCategoria } from "../signatures/estadisticasPorCategoria.interface";

export class EstadisticasPorCategoria implements IEstadisticasPorCategoria {
    constructor(private readonly preguntaRepository: IPreguntaRepository) {}

    async exec(idCategoria: string): Promise<IEstadisticasPorCategoriaDto> {
        const result = await this.preguntaRepository.getNumeroPreguntasAciertosYFallosPorCateogira(idCategoria);
        return result
    }

}