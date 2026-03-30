import { Pregunta } from '../../domain/entities/Pregunta';
import { EstadoHelper } from '../../domain/helpers/estado.helper';
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

				categorias: preguntaExterna.categorias.flatMap(c => {
					const categoria = categorias.get(c.nombreCategoria);
					return categoria ? [categoria.idCategoria] : [];
				}),
				estado: EstadoHelper.fromString(preguntaExterna.estado)
			})

			await this.preguntaRepository.createPregunta(pregunta);
		}
	}
}
