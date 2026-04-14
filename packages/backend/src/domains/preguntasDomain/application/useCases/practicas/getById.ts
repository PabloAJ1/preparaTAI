import { Pregunta } from "../../../domain/entities/Pregunta";
import { IPracticaRepository } from "../../../domain/repositories/practicaRepository.interface";
import { IPreguntaRepository } from "../../../domain/repositories/preguntasRepository.interface";
import { IPreguntasSessionSevice } from "../../../domain/signatures/PreguntasSessionSevice.interfcae";
import { IPracticaPobladaDto } from "../../dtos/practicaPoblada.dto";
import { MapsPregunta } from "../../mappers/mapDtoToEntityPregunta.mapper";
import { MezclarPreguntasService } from "../../services/MezclarPreguntas.service";
import { SelectorRespuestasService } from "../../services/SelectorRespuestas.service";
import { IGetPreguntasPractica } from "../../signatures/getPracticaById.interface";

export class GetPreguntasPractica implements IGetPreguntasPractica {
	constructor(		
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly practicaRepository: IPracticaRepository,
		private readonly preguntasSessionSevice: IPreguntasSessionSevice,
	){}

	async exec(
		idPractica: string,
		page = 1, 
		limit = 50,
		seed = Date.now()
	): Promise<IPracticaPobladaDto>{
		const practica = await this.practicaRepository.getPracticaPorId(idPractica);

		const idsPreguntas = [...practica.relacionPreguntasRespuestas.keys()]
		const session = await this.preguntasSessionSevice.getOrCreate(seed, idsPreguntas)

		const idsDePagina = session.obtenerPagina(page, limit);
		const preguntas = await this.preguntaRepository.getVariasPreguntasPorIds(idsDePagina)

		return {
			idPractica: practica.id,
			nombrePractica: practica.nombrePractica,
			preguntas: this.#estructurarPreguntas(preguntas, idsDePagina)
		}
	}

	#estructurarPreguntas(preguntas: Pregunta[], idsDePagina: string[]){
		const preguntasOrdenadar = MezclarPreguntasService.ordenarPorListaIds(preguntas, idsDePagina)
		const preguntasRespuestasMezcladas = SelectorRespuestasService.generarPreguntasConRespuestasMezcladas(preguntasOrdenadar, "PRACTICA")
		const preguntasMapeadas = preguntasRespuestasMezcladas.map(MapsPregunta.toDto)
		return preguntasMapeadas;
	}
}