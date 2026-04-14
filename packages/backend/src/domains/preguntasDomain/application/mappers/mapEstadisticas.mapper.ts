import { EstadisticaVO } from "../../domain/valueObjects/estadistica.vo";
import { IEstadosticasDto } from "../dtos/estadisticas.dto";

export class MapEstadisticas {
	static toDto(entity: EstadisticaVO): IEstadosticasDto {
		return {
			aciertos: entity.aciertos,
			fallos: entity.fallos,
			total: entity.total
		}
	}
}