import { IPreguntaExternasDto } from "../../../application/dtos/preguntasExternas.dto";
import { IPreguntasSyncPortService } from "../../../application/ports/preguntasSyncPortService.interface";
import { IPreguntasExternalAtlas } from "../interfaces/PreguntasExternalAtlas";
import { MapAtlasPreguntas } from "../mappers/mapAtlasPreguntas.mapper";

export class PreguntasSyncPort implements IPreguntasSyncPortService {
	constructor(
		private readonly getPreguntasFromAtlas: IPreguntasExternalAtlas
	){}

	async readAllPreguntas(): Promise<IPreguntaExternasDto[]> {
		const allPreguntas = await this.getPreguntasFromAtlas.getAllPreguntas();
		return allPreguntas.map(MapAtlasPreguntas.externalToInternal);
	}	
}