import { Pregunta } from "../../domain/entities/Pregunta";
import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { SelectorRespuestasService } from "../services/SelectorRespuestas.service";
import { IGetPreguntasPorCateogiraConPaginacion } from "../signatures/getPreguntasPorCateogiraConPaginacion.interface";

export class GetPreguntasPorCateogiraConPaginacion implements IGetPreguntasPorCateogiraConPaginacion {
	constructor(private readonly preguntaRepository: IPreguntaRepository){}

	async exec(
		idCategoria: string,
		page = 1, 
		limit = 50
	): Promise<IPreguntaDto[]>{
		const preguntas = await this.preguntaRepository.getPreguntasPorCategoriaPaginando(
			idCategoria,
			page,
			limit
		);

		const preguntasConRespuestaMezclada = preguntas.map(p => {
			return Pregunta.crear({
				categorias: p.categorias,
				enunciado: p.enunciado,
				idPregunta: p.idPregunta,
				respuestas: SelectorRespuestasService.generarRespuestas(p)
			})
		})

		const preguntasMapeadas = preguntasConRespuestaMezclada.map(MapsPregunta.toDto)
		return preguntasMapeadas;
	}
}