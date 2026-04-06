import { IGrupoPreguntasRepository } from "../../domain/repositories/grupoPreguntas.interface";
import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";
import { MapGrupoPreguntas } from "../mappers/mapGrupoPreguntas.mapper.mapper";
import { ICreateGrupoPreguntas } from "../signatures/createGrupoPreguntas.interface";

export class CreateGrupoPreguntas implements ICreateGrupoPreguntas {
	constructor(private readonly grupoPreguntasRepository: IGrupoPreguntasRepository){}
	
	async exec(grupoPreguntasPoblada: IGrupoPreguntasDto): Promise<IGrupoPreguntasDto> {
		const grupoEntity = MapGrupoPreguntas.toNewEntity(grupoPreguntasPoblada);
		const grupoSaved = await this.grupoPreguntasRepository.createGrupoPreguntas(grupoEntity);

		return MapGrupoPreguntas.toDto(grupoSaved)
	}
}