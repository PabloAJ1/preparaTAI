import { Pregunta as PreguntaEntity } from "../../../../../domains/preguntasDomain/domain/entities/Pregunta";
import { Pregunta } from "../schemas/pregunta.schema";
import { RespuestaVo } from "../../../../../domains/preguntasDomain/domain/valueObjects/RespuestaVo";

export class MapPreguntasMongo {
	static toModel(entity: PreguntaEntity): Pregunta {
		return {
			categorias: entity.categorias,
			enunciado: entity.enunciado,
			idPregunta: entity.idPregunta,
			respuestas: entity.respuestas.map(r => { 
					return {
					correcta: r.isCorrect,
					enunciado: r.enunciado
				}
			})
		}
	}

	static toEntity(model: Pregunta): PreguntaEntity {
		return PreguntaEntity.crear({
			categorias: model.categorias,
			enunciado: model.enunciado,
			respuestas: model.respuestas.map(r => RespuestaVo.crear({
				correcta: r.correcta,
				enunciado: r.enunciado
			})),
			idPregunta: model.idPregunta
		})
	}
}