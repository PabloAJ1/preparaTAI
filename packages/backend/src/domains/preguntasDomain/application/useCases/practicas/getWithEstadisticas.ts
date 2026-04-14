import { IPracticaRepository } from "../../../domain/repositories/practicaRepository.interface";
import { IPreguntaRepository } from "../../../domain/repositories/preguntasRepository.interface";
import { PracticasConEstadisticas } from "../../dtos/practicasConEstadisticas.dto";
import { IGetListadoPracticasConEstadisticas } from "../../signatures/getListadoPracticasConEstadisticas.interface";

export class GetListadoPracticasConEstadisticas implements IGetListadoPracticasConEstadisticas {
	constructor(		
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly practicaRepository: IPracticaRepository,
	){}

	async exec(): Promise<PracticasConEstadisticas[]>{
		const practicas = await this.practicaRepository.getAllPracticas();
		const result: PracticasConEstadisticas[] = []

		for(const practica of practicas){
			const idsPreguntas = [ ...practica.relacionPreguntasRespuestas.keys() ]
			const estadisticas = await this.preguntaRepository.getNumeroPreguntasAciertosYFallosPorGrupoPreguntas(
				idsPreguntas
			)
			result.push({
				idPractica: practica.id,
				nombrePractica: practica.nombrePractica,
				numeroDePreguntas: idsPreguntas.length,
				estadisticas: {
					aciertos: estadisticas.aciertos,
					fallos: estadisticas.fallos,
					total: estadisticas.aciertos + estadisticas.fallos
				}
			})
		}

		return result;
	}
}