import { Pregunta } from '../../domain/entities/Pregunta';
import { RespuestaVo } from '../../domain/valueObjects/RespuestaVo';
import { IPreguntaDto } from '../dtos/pregunta.dto';

export class MapsPregunta {
	public static toEntity(dto: IPreguntaDto): Pregunta {
		return Pregunta.crear({
			enunciado: dto.enunciado,
			respuestas: dto.respuestas.map((r) => {
				return RespuestaVo.crear({
					correcta: r.correcta,
					enunciado: r.enunciado,
				});
			}),
		});
	}

	public static toDto(entity: Pregunta): IPreguntaDto {
		return {
			enunciado: entity.enunciado,
			respuestas: entity.respuestas.map((r) => {
				return {
					correcta: r.isCorrect,
					enunciado: r.enunciado,
				};
			}),
		};
	}
}
