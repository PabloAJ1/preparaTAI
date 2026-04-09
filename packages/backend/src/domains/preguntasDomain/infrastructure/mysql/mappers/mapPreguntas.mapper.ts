import { Pregunta } from "../../../../../domains/preguntasDomain/domain/entities/Pregunta";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { RespuestaVo } from "../../../../../domains/preguntasDomain/domain/valueObjects/RespuestaVo";
import { ContenidoPregunta } from "../../../domain/valueObjects/contenidoPregunta.vo";

export class MapPreguntas {
	static toEntity(dto: IPreguntaDto): Pregunta {
		return Pregunta.crear({
			categorias: [dto.categoria],
			enunciado: ContenidoPregunta.crearPregunta({
				enunciado: dto.enunciado
			}),
			respuestas: dto.respuestas.map(r => RespuestaVo.crear({
				enunciado: r.enunciado,
				correcta: r.correcta
			}))
		})
	}
}