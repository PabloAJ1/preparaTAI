import { CreatePracticaFromData } from "../../../domain/factories/createPracticaFromData";
import { IPracticaRepository } from "../../../domain/repositories/practicaRepository.interface";
import { IPreguntaRepository } from "../../../domain/repositories/preguntasRepository.interface";
import { ICategoriaAdapterService } from "../../ports/categoriaAdapterService.interface";
import { IMigrarPracticas } from "../../signatures/migrarPracticas.interface";

export class MigrarPracticas implements IMigrarPracticas {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly categoriaAdapterPort: ICategoriaAdapterService,
		private readonly practicaRepository: IPracticaRepository,
	){}

	async exec(): Promise<void> {
		const categorias = await this.categoriaAdapterPort.getAllCategoriasByTipo("PRACTICA");

		for(const cat of categorias){
			const preguntas = await this.preguntaRepository.getPreguntasPorCategoria(cat.idCategoria);
			const respuestasCorrectasPorPregunta: { idPregunta: string; respuestaCorrectaId: string }[] = preguntas.map(p => { 
				return { idPregunta: p.idPregunta, respuestaCorrectaId: p.respuestaCorrecta.id }
			})

			const practica = CreatePracticaFromData.crearFromDatos(respuestasCorrectasPorPregunta , cat.nombreCategoria)
			await this.practicaRepository.createPractica(practica)
		}
	}
}