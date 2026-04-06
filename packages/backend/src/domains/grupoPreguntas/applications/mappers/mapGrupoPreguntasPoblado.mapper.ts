import { GrupoPreguntas } from '../../domain/entities/GrupoPreguntas';
import { IGrupoPreguntasPobladaDto } from '../dtos/grupoPreguntasPoblada.dto';
import { IPreguntaDto } from '../dtos/pregunta.dto';

export class MapGrupoPreguntasPoblado {
	static toDto(
		grupoPregunta: GrupoPreguntas,
		preguntas: IPreguntaDto[]
	): IGrupoPreguntasPobladaDto {
		return {
			codigo: {
				codigo: grupoPregunta.codigo.codigo,
				lenguaje: grupoPregunta.codigo.lenguaje
			},
			textoPre: grupoPregunta.textoPre,
			textoPos: grupoPregunta.textoPos,
			preguntas: preguntas,
			id: grupoPregunta.idGrupoPreguntas
		};
	}
}
