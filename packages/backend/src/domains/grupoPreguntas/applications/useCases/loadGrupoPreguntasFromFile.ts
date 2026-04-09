import { IGrupoPreguntasRepository } from "../../domain/repositories/grupoPreguntas.interface";
import { ICategoriaPort } from "../interfaces/categoriasPort.interface";
import { ILoadPreguntasFromFilePort } from "../interfaces/loadPreguntasFromFilePort.interface";
import { IPreguntasServicePort } from "../interfaces/preguntasServicePort.interface";
import { MapGrupoPreguntas } from "../mappers/mapGrupoPreguntas.mapper.mapper";
import { ILoadGrupoPreguntasFromFile } from "../signatures/loadGrupoPreguntasFromFile.interface";

export class LoadGrupoPreguntasFromFile implements ILoadGrupoPreguntasFromFile {
	constructor(
		private readonly grupoPreguntasRepository: IGrupoPreguntasRepository,
		private readonly loadGrupoPreguntasFromFile: ILoadPreguntasFromFilePort,
		private readonly preguntasServicePort: IPreguntasServicePort,
		private readonly categoriasPort: ICategoriaPort,
	){}

	async exec(): Promise<void> {
		const grupoPreguntas = await this.loadGrupoPreguntasFromFile.loadFile();
		for(const grupo of grupoPreguntas){
			const idsPregunta = await this.preguntasServicePort.createPreguntas(grupo.preguntas);
			const idCategoria = await this.categoriasPort.getIdCategoriaByName(grupo.idGrupoPregunta);
			const entity = await MapGrupoPreguntas.toNewEntity({
				id: 'nuevo',
				codigo: grupo.codigo,
				textoPos: grupo.textoPos,
				textoPre: grupo.textoPre,
				idPreguntas: idsPregunta,
				idGrupoPregunta: idCategoria
			});

			await this.grupoPreguntasRepository.createGrupoPreguntas(entity);
		}

	}
}