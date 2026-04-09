import { CodigoVo } from "../../../../../shared/domains/valueObjects/codigo.vo";
import { Pregunta as PreguntaEntity } from "../../../../../domains/preguntasDomain/domain/entities/Pregunta";
import { RespuestaVo } from "../../../../../domains/preguntasDomain/domain/valueObjects/RespuestaVo";
import { EstadoHelper } from "../../../domain/helpers/estado.helper";
import { ContenidoPregunta } from "../../../domain/valueObjects/contenidoPregunta.vo";
import { EstadisticaVO } from "../../../domain/valueObjects/estadistica.vo";
import { IPregunta } from "../interfaces/pregunta.interface";
import { IPreguntaDocument } from "../schemas/pregunta.schema";
import { ELenguaje } from "../../../../../shared/domains/enums/lenguaje.enum";

export class MapPreguntasMongo {
	static toModel(entity: PreguntaEntity): IPregunta {
		const codigo = entity.enunciado.codigo 
			? { codigo: entity.enunciado.codigo.codigo, lenguaje: entity.enunciado.codigo.lenguaje }
			: undefined

		return {
			categorias: entity.categorias,
			enunciado: {
				enunciado: entity.enunciado.enunciado,
				codigo: codigo,
				imagen: entity.enunciado.imagen
			},
			idPregunta: entity.idPregunta,
			descartada: entity.isDescartada,
			respuestas: entity.respuestas.map(
				r => { 
					return {
						correcta: r.isCorrect,
						enunciado: r.enunciado,
						id: r.id
					}
				}
			),
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
			enunciado: ContenidoPregunta.crearPregunta({
				enunciado: model.enunciado.enunciado,
				codigo: model.enunciado.codigo 
					? CodigoVo.crearDesdeProps({
						codigo: model.enunciado.codigo.codigo,
						lenguaje:  ELenguaje[model.enunciado.codigo.lenguaje.toLocaleUpperCase() as keyof typeof ELenguaje]
					})
					: undefined,
				imagen: model.enunciado.imagen,
			}),
			respuestas: model.respuestas.map(r => RespuestaVo.crear({
				correcta: r.correcta,
				enunciado: r.enunciado,
				id: r.id
			})),
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