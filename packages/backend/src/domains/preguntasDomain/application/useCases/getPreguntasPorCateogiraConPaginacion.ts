import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGetPreguntasPorCateogiraConPaginacion } from "../signatures/getPreguntasPorCateogiraConPaginacion.interface";
import { ISelectorRespuestasService } from "../signatures/SelectorRespuestasService.interface";

export class GetPreguntasPorCateogiraConPaginacion implements IGetPreguntasPorCateogiraConPaginacion {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly selectorRespuestasService: ISelectorRespuestasService
	){}

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
		const preguntasConRespuestaMezclada = this.selectorRespuestasService.generar(preguntas)
		const preguntasMapeadas = preguntasConRespuestaMezclada.map(MapsPregunta.toDto)
		return preguntasMapeadas;
	}
}