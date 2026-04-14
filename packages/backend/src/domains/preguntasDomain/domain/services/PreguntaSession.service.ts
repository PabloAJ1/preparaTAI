import { PreguntaSession } from "../entities/PreguntasSession";
import { IPreguntaSessionRepository } from "../repositories/preguntasSessionRepository.interface";
import { IPreguntasSessionSevice } from "../signatures/PreguntasSessionSevice.interfcae";

export class PreguntaSessionService implements IPreguntasSessionSevice {
	constructor(		
		private readonly preguntasSessionRepository: IPreguntaSessionRepository,
	){}

	async getOrCreate(
		seed: number,
		listaIds: string[]
	): Promise<PreguntaSession> {
		const session = await this.preguntasSessionRepository.cargarPreguntaSesionPorSeed(seed);
		if(!session){
			return PreguntaSession.crear({
				createdAt: new Date(),
				listaPreguntasId: listaIds,
				seed: seed
			})
		}else{
			return session;
		}
	}
}