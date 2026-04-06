import { IGrupoPreguntasRepository } from "../../domain/repositories/grupoPreguntas.interface";
import { ILoadPreguntasFromFilePort } from "../interfaces/loadPreguntasFromFilePort.interface";
import { IPreguntasServicePort } from "../interfaces/preguntasServicePort.interface";
import { MapGrupoPreguntas } from "../mappers/mapGrupoPreguntas.mapper.mapper";
import { ILoadGrupoPreguntasFromFile } from "../signatures/loadGrupoPreguntasFromFile.interface";

export class LoadGrupoPreguntasFromFile implements ILoadGrupoPreguntasFromFile {
	constructor(
		private readonly grupoPreguntasRepository: IGrupoPreguntasRepository,
		private readonly loadGrupoPreguntasFromFile: ILoadPreguntasFromFilePort,
		private readonly preguntasServicePort: IPreguntasServicePort,

	){}

	async exec(): Promise<void> {
		const grupoPreguntas = await this.loadGrupoPreguntasFromFile.loadFile();
		for(const grupo of grupoPreguntas){
			const idsPregunta = await this.preguntasServicePort.createPreguntas(grupo.preguntas);
			const entity = MapGrupoPreguntas.toNewEntity({
				id: 'nuevo',
				codigo: grupo.codigo,
				textoPos: grupo.textoPos,
				textoPre: grupo.textoPre,
				idPreguntas: idsPregunta
			});

			await this.grupoPreguntasRepository.createGrupoPreguntas(entity);
		}

	}
}