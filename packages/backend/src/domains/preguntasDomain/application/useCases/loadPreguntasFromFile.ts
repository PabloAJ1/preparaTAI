import { ELenguaje } from '../../../../shared/domains/enums/lenguaje.enum';
import { CodigoVo } from '../../../../shared/domains/valueObjects/codigo.vo';
import { Pregunta } from '../../domain/entities/Pregunta';
import { EstadoHelper } from '../../domain/helpers/estado.helper';
import { IPreguntaRepository } from '../../domain/repositories/preguntasRepository.interface';
import { ContenidoPregunta } from '../../domain/valueObjects/contenidoPregunta.vo';
import { RespuestaVo } from '../../domain/valueObjects/RespuestaVo';
import { IDetectarCodigoEnEnunciadoService } from '../ports/detectarCodigoEnunciado.interface';
import { IExternalDataService } from '../ports/excelAdapterService.interface';
import { ICategoriasExternasService } from '../signatures/categoriasExternasService.interface';
import { ILoadPreguntasFromFile } from '../signatures/getPreguntasFromFile.interface';

export class LoadPreguntasFromFile implements ILoadPreguntasFromFile {
	constructor(
		private readonly fileReader: IExternalDataService,
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly categoriasExternasService: ICategoriasExternasService,
		private readonly detectarCodigoEnEnunciadoService: IDetectarCodigoEnEnunciadoService
	) {}

	async exec(): Promise<void> {
		const preguntasDto = await this.fileReader.cargarDatos();
		const categorias = await this.categoriasExternasService.getCategorias(preguntasDto)

		for(const preguntaExterna of preguntasDto){
			const preguntaContenido = await this.detectarCodigoEnEnunciadoService.exec(preguntaExterna.enunciado)

			const pregunta = Pregunta.crear({
				enunciado: ContenidoPregunta.crearPregunta({
					enunciado: preguntaContenido.enunciado,
					codigo: preguntaContenido.codigo
								? CodigoVo.crearDesdeProps({
									codigo: preguntaContenido.codigo.codigo,
									lenguaje: ELenguaje[preguntaContenido.codigo.lenguaje.toLocaleUpperCase() as keyof typeof ELenguaje] ?? ELenguaje.OTROS
								}): undefined,
				}),
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
