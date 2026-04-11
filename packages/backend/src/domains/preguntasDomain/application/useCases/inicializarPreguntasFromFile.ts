import { IGestionBDRepository } from "../ports/gestionBDRepository.interface";
import { IInicializarPreguntas } from "../signatures/inicializarPreguntas.interface";

export class InicializarPreguntasFromFile implements IInicializarPreguntas {
	constructor(
		private readonly preguntaRepository: IGestionBDRepository
	){}

	async exec(options: { clearDB: boolean  } = { clearDB: false }): Promise<void> {
		if(options.clearDB){
			await this.preguntaRepository.limpiarDB()
		}
			
		await this.preguntaRepository.restore();
	}

}