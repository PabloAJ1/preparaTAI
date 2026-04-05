import { IEstadisticasPorCategoriaDto } from "../dtos/estadisticasPorCategoria.dto";

export interface IEstadisticasPorCategoria {
    exec(idCategoria: string): Promise<IEstadisticasPorCategoriaDto>
}