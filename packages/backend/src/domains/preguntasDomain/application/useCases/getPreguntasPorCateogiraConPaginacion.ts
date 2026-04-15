import { Pregunta } from "../../domain/entities/Pregunta";
import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGetPreguntasPorCateogiraConPaginacion } from "../signatures/getPreguntasPorCateogiraConPaginacion.interface";

/**
 * @version 2
 * En esta version, cogiamos las preguntas en base a un seed que ordenaba aleatoriamente la busqueda en la base de datos
 * Nos encontramos con varios problmas, el principal es que el randomKey que generamos cuando creamos las preguntas no es
 * unico, y la variacion entre uno y otro puede ser pequeña, creando cierta inconsistencia en la busqueda de la bd (sobre todo en mongo)
 * 
 * El mayor problema es que cuando realizamos esta busqueda de la segunda pagina y sucesivas, la gran mayoria de las veces recoge preguntas
 * que ya han sido mostradas en la/s pagina/s anteriores
 */

export class GetPreguntasPorCateogiraConPaginacion implements IGetPreguntasPorCateogiraConPaginacion {
	constructor(private readonly preguntaRepository: IPreguntaRepository){}

	async exec(
		idCategoria: string,
		page = 1, 
		limit = 50,
		seed = 0
	): Promise<IPreguntaDto[]>{
		const preguntas = await this.preguntaRepository.getPreguntasPorCategoriaPaginandoConSeed(
			idCategoria,
			page,
			limit,
			seed
		);
		const preguntasConRespuestaMezclada = preguntas.map(p => {
			return Pregunta.crear({
				categorias: p.categorias,
				enunciado: p.enunciado,
				idPregunta: p.idPregunta,
				respuestas: [], // SelectorRespuestasService.generar(p),
				estadisticas: p.estadisticas,
				estado: p.estado
			})
		})
		const preguntasMapeadas = preguntasConRespuestaMezclada.map(MapsPregunta.toDto)
		return preguntasMapeadas;
	}
}