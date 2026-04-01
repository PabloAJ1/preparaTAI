import { IPreguntasPort } from "../../../application/ports/preguntasPort.interface";
import { IInicializarPreguntas } from "../signatures/inicializarPreguntas.interface";

export class PreguntasPortService implements IPreguntasPort {
	constructor(
		private readonly inicializarPreguntas: IInicializarPreguntas
	){}

	async inicializarDB(): Promise<void> {
		await this.inicializarPreguntas.exec({ clearDB: true })
	}

}