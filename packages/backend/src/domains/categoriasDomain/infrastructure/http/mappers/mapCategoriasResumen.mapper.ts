import { CategoriaResumenDto } from "../../../../../domains/categoriasDomain/application/dtos/categoriasResumen.dto";
import { components } from "../../../../../types/openapi";

type TCategoriaResumen = components["schemas"]["CategoriaResumen"]

export class MapCategoriasResumen {
	static toReturnType(dto: CategoriaResumenDto): TCategoriaResumen {
		return {
			id: dto.id,
			nombre: dto.nombre,
			numeroPreguntas: dto.numeroPreguntas,
			estadisticas: {
				aciertos: dto.estadisticas.aciertos,
				fallos: dto.estadisticas.fallos,
				total: dto.estadisticas.aciertos + dto.estadisticas.fallos
			}
		}
	}
}