import { IGrupoPreguntasRepository } from "../../domain/repositories/grupoPreguntas.interface";
import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";
import { IPreguntasServicePort } from "../interfaces/preguntasServicePort.interface";
import { MapGrupoPreguntasPoblado } from "../mappers/mapGrupoPreguntasPoblado.mapper";
import { IGetGrupoPreguntasByIdCategoria } from "../signatures/getGrupoPreguntasByIdCategoria.interface";

export class GetGrupoPreguntasByIdCategoria implements IGetGrupoPreguntasByIdCategoria {
	constructor(
		private readonly grupoPreguntasRepository: IGrupoPreguntasRepository,
		private readonly preguntasServicePort: IPreguntasServicePort,
	){}

	async exec(idCategoria: string): Promise<IGrupoPreguntasPobladaDto[]> {
		const gruposPreguntas = await this.grupoPreguntasRepository.getGrupoPreguntasByIdCategoria(idCategoria);
		const grupoDto = [];

		for(const pregunta of gruposPreguntas){
			const preguntasAsociadas = await this.preguntasServicePort.getPreguntasPorId(pregunta.preguntas);
			grupoDto.push(MapGrupoPreguntasPoblado.toDto(
				pregunta,
				preguntasAsociadas
			))
		}

		return grupoDto;
	}
}