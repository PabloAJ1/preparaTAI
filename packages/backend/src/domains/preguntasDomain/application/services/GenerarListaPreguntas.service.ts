import { Pregunta } from "../../domain/entities/Pregunta";
import { TTipoPreguntas } from "../../domain/enums/tipoPreguntas.enum";
import { ICategoriaDto } from "../dtos/categoria.dto";
import { IPreguntaPobladaDto } from "../dtos/preguntaPoblada.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { ICategoriaAdapterService } from "../ports/categoriaAdapterService.interface";
import { IGenerarListaPreguntasService } from "../signatures/GenerarListaPreguntasService.interface";
import { IMezclarPreguntasService } from "../signatures/mezclarPreguntasService,interface";
import { ISelectorRespuestasService } from "../signatures/SelectorRespuestasService.interface";

export class GenerarListaPreguntasService implements IGenerarListaPreguntasService {
	constructor(
		private readonly mezclarPreguntasService: IMezclarPreguntasService,
		private readonly selectorRespuestasService: ISelectorRespuestasService,
		private readonly categoriaAdapterService: ICategoriaAdapterService
	){}

	async generar(preguntas: Pregunta[], idsDePagina: string[], tipoPreguntas?: TTipoPreguntas): Promise<IPreguntaPobladaDto[]> {
		const ordenadas = this.#ordenar(preguntas, idsDePagina);
		const mezcladas = this.#mezclarRespuestas(ordenadas, tipoPreguntas)
		const categorizadas = await this.#categorizar(mezcladas)
		return categorizadas;
	}

	#ordenar(preguntas: Pregunta[], idsDePagina: string[]): Pregunta[]{
		return this.mezclarPreguntasService.ordenarPorListaIds(preguntas, idsDePagina)
	}

	#mezclarRespuestas(preguntas: Pregunta[], tipoPreguntas?: TTipoPreguntas): Pregunta[]{
		return this.selectorRespuestasService.generar(preguntas, tipoPreguntas)
	}

	async #categorizar(preguntas: Pregunta[]): Promise<IPreguntaPobladaDto[]> {
		const idsCategorias = [...new Set(preguntas.flatMap(p => p.categorias))];
		const categorias = await this.categoriaAdapterService.getByIds(idsCategorias);

		const mapaCategorias = new Map(
			categorias.map(c => [c.idCategoria, c])
		);

		const result: IPreguntaPobladaDto[] = preguntas.map(p => ({
			...MapsPregunta.toDto(p),
			categorias: p.categorias.reduce<ICategoriaDto[]>(
				(acc, id) => {
					const cat = mapaCategorias.get(id);
					if (cat) acc.push(cat);
					return acc;
				}, [])
			}));

		return result
	}
}