import { IPreguntaExternasDto } from "../../../application/dtos/preguntasExternas.dto";
import { IPreguntasAtlasDto } from "../dtos/preguntasAtlas.dto";

export class MapAtlasPreguntas {
	static externalToInternal(externalDto: IPreguntasAtlasDto): IPreguntaExternasDto {
		return {
			categorias: externalDto.categorias,
			enunciado: externalDto.enunciado,
			estado: externalDto.estado,
			id: externalDto.idPregunta,
			respuestas: externalDto.respuestas
		}
	}
}