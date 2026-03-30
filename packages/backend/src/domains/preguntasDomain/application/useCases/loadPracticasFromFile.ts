import { IPreguntaRepository } from '../../domain/repositories/preguntasRepository.interface';
import { IExternalDataService } from '../ports/excelAdapterService.interface';
import { ICategoriasExternasService } from '../signatures/categoriasExternasService.interface';
import { IGeneradorDePreguntasDePracticaService } from '../signatures/generadorDePreguntasDePracticaService.interface';
import { ILoadPreguntasFromFile } from '../signatures/getPreguntasFromFile.interface';

export class LoadPracticasFromFile implements ILoadPreguntasFromFile {
	constructor(
		private readonly fileReader: IExternalDataService,
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly categoriasExternasService: ICategoriasExternasService,
		private readonly generadorDePreguntasDePracticaService: IGeneradorDePreguntasDePracticaService
	) {}

	async exec(): Promise<void> {
		const preguntasDto = await this.fileReader.cargarDatos();
		const categorias = await this.categoriasExternasService.getCategorias(
			preguntasDto
		);

		const preguntas = this.generadorDePreguntasDePracticaService.exec(preguntasDto, categorias);

		for(const pregunta of preguntas){
			await this.preguntaRepository.createPregunta(pregunta);
		}
	}
}
