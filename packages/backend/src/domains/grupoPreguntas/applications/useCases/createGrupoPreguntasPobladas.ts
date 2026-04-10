import { IGrupoPreguntasRepository } from "../../domain/repositories/grupoPreguntas.interface";
import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";
import { IGrupoPreguntasPobladaDto } from "../dtos/grupoPreguntasPoblada.dto";
import { IPreguntasServicePort } from "../interfaces/preguntasServicePort.interface";
import { MapGrupoPreguntas } from "../mappers/mapGrupoPreguntas.mapper.mapper";
import { ICreateGrupoPreguntasPobladas } from "../signatures/createGrupoPreguntasPobladas.interface";

export class CreateGrupoPreguntasPobladas implements ICreateGrupoPreguntasPobladas {
	constructor(
		private readonly grupoPreguntasRepository: IGrupoPreguntasRepository,
		private readonly preguntasServicePort: IPreguntasServicePort,
	){}
	
	async exec(grupoPreguntasPoblada: IGrupoPreguntasPobladaDto): Promise<IGrupoPreguntasDto> {
		const idPreguntasGuardadas = await this.preguntasServicePort.createPreguntas(grupoPreguntasPoblada.preguntas);
		const grupoPregunta = await MapGrupoPreguntas.toNewEntity({
			...grupoPreguntasPoblada,
			idPreguntas: idPreguntasGuardadas
		});
		const grupoSaved = await this.grupoPreguntasRepository.createGrupoPreguntas(grupoPregunta);

		return MapGrupoPreguntas.toDto(grupoSaved)
	}
}