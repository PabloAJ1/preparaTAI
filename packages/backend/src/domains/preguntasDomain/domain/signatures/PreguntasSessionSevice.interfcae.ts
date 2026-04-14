import { PreguntaSession } from "../entities/PreguntasSession";

export interface IPreguntasSessionSevice {
	getOrCreate(
		seed: number,
		listaIds: string[]
	): Promise<PreguntaSession>
}