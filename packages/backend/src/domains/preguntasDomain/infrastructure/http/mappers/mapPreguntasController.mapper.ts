import { IPreguntaDto } from "../../../../../domains/preguntasDomain/application/dtos/pregunta.dto";
import { components } from "../../../../../types/openapi"
import { IListaPreguntasPobladasDto } from "../../../application/dtos/listaPreguntasPobladas.dto";
import { IPreguntaPobladaDto } from "../../../application/dtos/preguntaPoblada.dto";

type TPreguntas = components["schemas"]["Pregunta"]
type TListaDePreguntasPorCategoria = components['schemas']['ListaDePreguntasPorCategoria'];

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

	static toTypePoblado(dto: IPreguntaPobladaDto): TPreguntas {
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
			categorias: dto.categorias?.map(c => {
				return {
					id: c.idCategoria,
					nombre: c.nombreCategoria,
					tipo: c.tipo
				}
			})
		}
	}

	static toTypoListaPoblada(dto: IListaPreguntasPobladasDto): TListaDePreguntasPorCategoria {
		return {
			idCategoriaPrincipal: dto.idCategoriaPrincipal,
			nombreCategoriaPrincipal: dto.nombreCategoriaPrincipal,
			preguntas: dto.listaPreguntas.map(this.toTypePoblado)
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