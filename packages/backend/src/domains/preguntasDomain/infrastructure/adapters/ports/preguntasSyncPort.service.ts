import { IPreguntaAtlasDto } from "../../../application/dtos/preguntasAtlas.dto";
import { IPreguntasSyncPortService } from "../../../application/ports/preguntasSyncPortService.interface";
import { IGetPreguntasFromAtlas } from "../signatures/getPreguntasFromAtlas.interface";

export class PreguntasSyncPort implements IPreguntasSyncPortService {
	constructor(
		private readonly getPreguntasFromAtlas: IGetPreguntasFromAtlas
	){}

	async readAllPreguntas(): Promise<IPreguntaAtlasDto> {
		const allPreguntas = await this.getPreguntasFromAtlas.getAllPreguntas();
		return allPreguntas;
	}	
}