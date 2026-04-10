import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { IPreguntasAB } from "../dtos/preguntasAB.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGenerarPreguntasAB } from "../signatures/generarPreguntasAB.interfaces";
import { IGenerarPreguntasABService } from "../signatures/generarPreguntasABService.interfaces";

export class GenerarPreguntasAB implements IGenerarPreguntasAB {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly generarPreguntasABService: IGenerarPreguntasABService
	) {}

	async exec(preguntaAB: IPreguntasAB): Promise<IPreguntaDto[]> {
		const listaPreguntas = await this.generarPreguntasABService.generar(preguntaAB);
		const listaPreguntasGuardadas = []

		for(const pregunta of listaPreguntas){
			listaPreguntasGuardadas.push(await this.preguntaRepository.createPregunta(pregunta))
		}

		return listaPreguntasGuardadas.map(MapsPregunta.toDto);
	}
}