import { Pregunta } from '../../domain/entities/Pregunta';
import { IPreguntaRepository } from '../../domain/repositories/preguntasRepository.interface';
import { RespuestaVo } from '../../domain/valueObjects/RespuestaVo';
import { IExternalDataService } from '../ports/excelAdapterService.interface';
import { ICategoriasExternasService } from '../signatures/categoriasExternasService.interface';
import { ILoadPreguntasFromFile } from '../signatures/getPreguntasFromFile.interface';

export class LoadPreguntasFromFile implements ILoadPreguntasFromFile {
	constructor(
		private readonly fileReader: IExternalDataService,
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly categoriasExternasService: ICategoriasExternasService
	) {}

	/**
	 * Esto lo cambiaré para que en vez de mandarse un array de string, mande un array de dtos
	 */
	async exec(): Promise<void> {
		const preguntasDto = await this.fileReader.cargarDatos();
		const categorias = await this.categoriasExternasService.getCategorias(preguntasDto)

		for(const preguntaExterna of preguntasDto){
			const pregunta = Pregunta.crear({
				enunciado: preguntaExterna.enunciado,
				respuestas: preguntaExterna.respuestas.filter(r => r.enunciado !== undefined).map(r => {
					return RespuestaVo.crear({
						correcta: r.correcta,
						enunciado: r.enunciado
					})
				}),
				categorias: preguntaExterna.categorias
					.map(c => categorias.get(c.replace("Practica-", ""))?.idCategoria)
					.filter((id): id is string => id !== undefined)
			})

			await this.preguntaRepository.createPregunta(pregunta);
		}
	}
}
