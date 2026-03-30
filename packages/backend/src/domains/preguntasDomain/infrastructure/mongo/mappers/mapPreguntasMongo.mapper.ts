import { Pregunta as PreguntaEntity } from "../../../../../domains/preguntasDomain/domain/entities/Pregunta";
import { RespuestaVo } from "../../../../../domains/preguntasDomain/domain/valueObjects/RespuestaVo";
import { EstadoHelper } from "../../../domain/helpers/estado.helper";
import { EstadisticaVO } from "../../../domain/valueObjects/estadistica.vo";
import { IPregunta } from "../interfaces/pregunta.interface";
import { IPreguntaDocument } from "../schemas/pregunta.schema";

export class MapPreguntasMongo {
	static toModel(entity: PreguntaEntity): IPregunta {
		return {
			categorias: entity.categorias,
			enunciado: entity.enunciado,
			idPregunta: entity.idPregunta,
			descartada: entity.isDescartada,
			respuestas: entity.respuestas.map(r => { 
					return {
					correcta: r.isCorrect,
					enunciado: r.enunciado
				}
			}),
			estadisticas: {
				aciertos: entity.estadisticas.aciertos,
				fallos: entity.estadisticas.fallos,
				total: entity.estadisticas.total,
			},
			randomKey: Math.random(),
			estado: entity.estado
		}
	}

	static toEntity(model: IPreguntaDocument): PreguntaEntity {
		return PreguntaEntity.crear({
			categorias: model.categorias,
			enunciado: model.enunciado,
			respuestas: model.respuestas.map(r => RespuestaVo.crear({
				correcta: r.correcta,
				enunciado: r.enunciado
			})),
			descartada: model.descartada ?? false,
			idPregunta: model.idPregunta,
			estadisticas: model.estadisticas
				? EstadisticaVO.crear({
					aciertos: model.estadisticas.aciertos,
					fallos: model.estadisticas.fallos,
					total: model.estadisticas.total,
				})
				: EstadisticaVO.inicializar(),
			estado: EstadoHelper.fromString(model.estado)
		})
	}
}