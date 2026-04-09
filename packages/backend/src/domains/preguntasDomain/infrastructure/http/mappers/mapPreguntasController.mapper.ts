import { IPreguntaDto } from "../../../../../domains/preguntasDomain/application/dtos/pregunta.dto";
import { components } from "../../../../../types/openapi"

type TPreguntas = components["schemas"]["Pregunta"]

export class MapPreguntaController {
	static toType(dto: IPreguntaDto): TPreguntas {
		return {
			enunciado: dto.enunciado,
			codigo: dto.codigo,
			id: dto.id,
			respuestas: dto.respuestas.map(r => { 
				return {
					id: r.id,
					correcta: r.correcta,
					enunciado: r.enunciado,
				}
			}),
			estadisticas: {
				aciertos: dto.estadisticas.aciertos,
				fallos: dto.estadisticas.fallos,
				total: dto.estadisticas.total
			},
			estado: dto.estado,
		}
	}

	static toDtoInterno(body: TPreguntas): IPreguntaDto {
		return {
			enunciado: body.enunciado,
			estadisticas: { aciertos: body.estadisticas.aciertos, fallos: body.estadisticas.fallos, total: body.estadisticas.total},
			estado: body.estado,
			id: body.id,
			respuestas: body.respuestas,
			codigo: body.codigo,
			categorias: body.categorias?.map(c => c.id) ?? []
		}
	}
}