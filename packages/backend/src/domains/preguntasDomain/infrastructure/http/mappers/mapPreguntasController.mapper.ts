import { IPreguntaDto } from "../../../../../domains/preguntasDomain/application/dtos/pregunta.dto";
import { components } from "../../../../../types/openapi"

type TPreguntas = components["schemas"]["Pregunta"]

export class MapPreguntaController {
	static toType(dto: IPreguntaDto): TPreguntas {
		return {
			enunciado: dto.enunciado,
			id: dto.id,
			respuestas: dto.respuestas.map(r => { 
				return {
					id: 0,
					correcta: r.correcta,
					enunciado: r.enunciado
				}
			}),
			estadisticas: {
				aciertos: dto.estadisticas.aciertos,
				fallos: dto.estadisticas.fallos,
				total: dto.estadisticas.total
			},
			descartada: dto.descartada,
			estado: dto.estado,
		}
	}
}