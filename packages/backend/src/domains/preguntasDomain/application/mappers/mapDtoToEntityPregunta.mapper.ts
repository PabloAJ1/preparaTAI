import { CodigoVo } from '../../../../shared/domains/valueObjects/codigo.vo';
import { Pregunta } from '../../domain/entities/Pregunta';
import { EstadoHelper } from '../../domain/helpers/estado.helper';
import { ContenidoPregunta } from '../../domain/valueObjects/contenidoPregunta.vo';
import { RespuestaVo } from '../../domain/valueObjects/RespuestaVo';
import { IPreguntaDto } from '../dtos/pregunta.dto';
import { IPreguntaExternasDto } from '../dtos/preguntasExternas.dto';

export class MapsPregunta {
	public static toEntityNueva(dto: IPreguntaDto): Pregunta {
		return Pregunta.crear({
			enunciado: ContenidoPregunta.crearPregunta({
				enunciado: dto.enunciado
			}),
			categorias: dto.categorias ?? [],
			respuestas: dto.respuestas.map((r) => {
				return RespuestaVo.crear({
					correcta: r.correcta,
					enunciado: r.enunciado,
				});
			}),
			estado: EstadoHelper.fromString(dto.estado)
		});
	}

	public static toEntity(dto: IPreguntaDto): Pregunta {
		return Pregunta.crear({
			enunciado: ContenidoPregunta.crearPregunta({
				enunciado: dto.enunciado,
				codigo: dto.codigo ? CodigoVo.crearDesdeProps({codigo: dto.codigo}) : undefined
			}),
			categorias: dto.categorias ?? [],
			respuestas: dto.respuestas.map((r) => {
				return RespuestaVo.crear({
					correcta: r.correcta,
					enunciado: r.enunciado,
					id: r.id
				});
			}),
			idPregunta: dto.id,
			estado: EstadoHelper.fromString(dto.estado)
		});
	}

	public static toDto(entity: Pregunta): IPreguntaDto {
		return {
			id: entity.idPregunta,
			enunciado: entity.enunciado.enunciado,
			codigo: entity.enunciado.codigo?.codigo,
			respuestas: entity.respuestas.map((r) => {
				return {
					correcta: r.isCorrect,
					enunciado: r.enunciado,
					id: r.id,
				};
			}),
			categorias: entity.categorias,
			estadisticas: {
				aciertos: entity.estadisticas.aciertos,
				fallos: entity.estadisticas.fallos,
				total: entity.estadisticas.total
			},
			estado: entity.estado
		};
	}

	public static externalToPregunta(dto: IPreguntaExternasDto): Pregunta{
		return Pregunta.crear({
			enunciado: ContenidoPregunta.crearPregunta({
				enunciado: dto.enunciado
			}),
			categorias: dto.categorias,
			respuestas: dto.respuestas.map((r) => {
				return RespuestaVo.crear({
					correcta: r.correcta,
					enunciado: r.enunciado,
				});
			}),
			idPregunta: dto.id,
			estado: EstadoHelper.fromString(dto.estado),
		});
	}
}
