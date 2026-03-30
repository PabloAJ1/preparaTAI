import { Pregunta } from "../../domain/entities/Pregunta";
import { EEstado } from "../../domain/enums/estado.enum";
import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { ICategoriaAdapterService } from "../ports/categoriaAdapterService.interface";
import { IMigrationDB } from "../signatures/migrations.interface";

export class MigrationDB implements IMigrationDB {
	constructor(
		private readonly preguntaRepositoryOrigin: IPreguntaRepository,
		private readonly preguntaRepositoryDestiny: IPreguntaRepository,
		private readonly categoriasPort: ICategoriaAdapterService
	){}

	async exec(): Promise<void> {
		const originData = await this.preguntaRepositoryOrigin.getAllPreguntas();
		const listadoCategorias = await this.categoriasPort.getAllCategorias();

		const categoriasMap = new Map(
			listadoCategorias.map(c => [c.nombreCategoria, c.idCategoria])
		);

		for(const data of originData){
			const categoriaId = categoriasMap.get(data.categorias[0]);
			const newPregunta = Pregunta.crear({
				categorias: categoriaId ? [categoriaId] : [],
				enunciado: data.enunciado,
				respuestas: data.respuestas,
				idPregunta: data.idPregunta,
				estado: EEstado.VERIFICADO //Suponemos que las preguntas que estan en el PreparaTAI v.2 est´ñan todas bastante verificadas
			})

			await this.preguntaRepositoryDestiny.createPregunta(newPregunta)
		}		
	}
}