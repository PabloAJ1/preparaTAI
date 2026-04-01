import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IPreguntasSyncPortService } from "../ports/preguntasSyncPortService.interface";
import { IInicializarPreguntas } from "../signatures/inicializarPreguntas.interface";

export class InicializarPreguntas implements IInicializarPreguntas {
	constructor(
		private readonly preguntasSyncPortService: IPreguntasSyncPortService,
		private readonly preguntaRepository: IPreguntaRepository
	){}

	async exec(options: { clearDB: boolean  } = { clearDB: false }): Promise<void> {
		const preguntasExternas = await this.preguntasSyncPortService.readAllPreguntas()
		const preguntasEntities = preguntasExternas.map(MapsPregunta.externalToPregunta);
		if(options.clearDB){
			await this.preguntaRepository.limpiarDB()
		}
			
		await this.preguntaRepository.createBulkPreguntas(preguntasEntities)
	}

}