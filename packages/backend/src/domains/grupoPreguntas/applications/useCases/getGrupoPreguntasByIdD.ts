import { IGrupoPreguntasRepository } from "../../domain/repositories/grupoPreguntas.interface";
import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";
import { IPreguntasServicePort } from "../interfaces/preguntasServicePort.interface";
import { MapGrupoPreguntasPoblado } from "../mappers/mapGrupoPreguntasPoblado.mapper";
import { IGetGrupoPreguntasByIdD } from "../signatures/getGrupoPreguntasByIdD.interface";

export class GetGrupoPreguntasByIdD implements IGetGrupoPreguntasByIdD {
	constructor(
		private readonly grupoPreguntasRepository: IGrupoPreguntasRepository,
		private readonly preguntasServicePort: IPreguntasServicePort,
	){}

	async exec(idGrupo: string): Promise<IGrupoPreguntasPobladaDto> {
		const grupoPreguntas = await this.grupoPreguntasRepository.getGrupoPreguntasById(idGrupo);
		const preguntasAsociadas = await this.preguntasServicePort.getPreguntasPorId(grupoPreguntas.preguntas);

		return MapGrupoPreguntasPoblado.toDto(
			grupoPreguntas,
			preguntasAsociadas
		)
	}
}