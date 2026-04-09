import { IPreguntaDto } from "../../../applications/dtos/pregunta.dto";
import { IPreguntasServicePort } from "../../../applications/interfaces/preguntasServicePort.interface";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { IBuscarOCrearCategoriaPorNombre } from "../signatures/buscarOCrearCategoriaPorNombre.interface";
import { ICreatePregunta } from "../signatures/createPregunta.interface";
import { IGetVariasPreguntasPorId } from "../signatures/getVariasPreguntasPorId.interface";

export class PreguntasPortService implements IPreguntasServicePort{
	constructor(
		private readonly getVariasPreguntasPorId: IGetVariasPreguntasPorId,
		private readonly createPregunta: ICreatePregunta,
		private readonly buscarOCrearCategoria: IBuscarOCrearCategoriaPorNombre
	){}

	async createPreguntas(preguntas: IPreguntaDto[]): Promise<string[]> {
		const listaIdPreguntas: string[] = [];
		const categoriasConId: string[] = []

		for(const categoria of preguntas[0].categorias){
			const cat: ICategoriaDto = {
				idCategoria: 'desconocido',
				nombreCategoria: `GRUPO-${categoria}`,
				tipo: 'GRUPOPREGUNTAS'
			}
			const findCategoria = await this.buscarOCrearCategoria.exec(cat)
			categoriasConId.push(findCategoria.idCategoria)
		}
		
		for(const pregunta of preguntas){
			const preguntaAlmacenada = await this.createPregunta.exec({
				...pregunta,
				categorias: categoriasConId,
			});
			listaIdPreguntas.push(preguntaAlmacenada.id);
		}

		return listaIdPreguntas;
	}

	async getPreguntasPorId(preguntas: string[]): Promise<IPreguntaDto[]> {
		const result = await this.getVariasPreguntasPorId.exec(preguntas);
		return result;
	}
}