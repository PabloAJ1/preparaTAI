import { components } from '../../../../../types/openapi';
import { IGrupoPreguntasPobladaDto } from '../../../applications/dtos/grupoPreguntasPoblada.dto';

type TGrupoPreguntas = components['schemas']['GrupoPreguntasRelacionadas'];
type TPreguntas = components['schemas']['Pregunta'];

export class MapGrupoPreguntasController {
	public static toResponse(dto: IGrupoPreguntasPobladaDto): TGrupoPreguntas {
		const preguntas: TPreguntas[] = []
		
		for(const p of dto.preguntas){
			preguntas.push({
				enunciado: p.enunciado,
				estadisticas: p.estadisticas,
				estado: p.estado,
				id: p.id,
				respuestas: p.respuestas.map(r => { return {
					enunciado: r.enunciado,
					correcta: r.correcta,
					id: r.id
				}})
			})
		}

		return {
			id: dto.id,
			preguntas: preguntas,
			idGrupoPregunta: dto.idGrupoPregunta,
			textoPre: dto.textoPre,
			textoPos: dto.textoPos,
			codigo: dto.codigo.codigo,
			lenguaje: dto.codigo.lenguaje
		}
	}
}