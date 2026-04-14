import { Pregunta } from "../../domain/entities/Pregunta";
import { PreguntaSession } from "../../domain/entities/PreguntasSession";
import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntaSessionRepository } from "../../domain/repositories/preguntasSessionRepository.interface";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { MezclarPreguntasService } from "../services/MezclarPreguntas.service";
import { SelectorRespuestasService } from "../services/SelectorRespuestas.service";
import { IGetPreguntasPorCateogiraConPaginacion } from "../signatures/getPreguntasPorCateogiraConPaginacion.interface";
import { GetPreguntasPorCateogiraConPaginacion } from "./getPreguntasPorCateogiraConPaginacion";

/**
 * @version 3
 * En esta versión vamos a crear una entidad "sesion" que va a persistir.
 * En primer lugar obtenedremos el numero de preguntas de la categoria, ya que si el numero es inferior a el numero
 * solicitado por pagina (parametro limit), no será necesario realizar el proceso y simplemente devolveremos las preguntas que haya en la bd
 * 
 * Si el numero de elementos es mayor que limit, tendremos que verificar si existe o no una sesion ya creada para el seed que recibimos
 * 
 * En caso de que no exista obtendremos todos los ids de las preguntas de la categoria que estamos buscando, los mezclaremos aleatoriamente 
 * y crearemos una sesion
 * 
 * Una vez que tengamos la sesion (nueva o anterior) iremos tomando los elementos corresponedientes a la pagina en la que nos encontremos
 * e iremos buscandolos en la bd
 * 
 * Hay que tomar espcecial cuidado, ya que si realizamos la busqueda de las preguntas con el operador $in este no preserva el orden del array,
 * por lo tanto luego serán necesario ordenarlo de acuerdo al orden de la sesion
 */

export class GetPreguntasPorCateogiraConSesion implements IGetPreguntasPorCateogiraConPaginacion {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly preguntasSessionRepository: IPreguntaSessionRepository,
		private readonly getPreguntasPorCateogiraConPaginacionUseCase: GetPreguntasPorCateogiraConPaginacion
	){}

	async exec(
		idCategoria: string,
		page = 1, 
		limit = 50,
		seed = 0
	): Promise<IPreguntaDto[]>{
		const [ numeroDePreguntas, session ] = await Promise.all([
			this.preguntaRepository.getNumeroPreguntasPorCategoria(idCategoria),
			this.preguntasSessionRepository.cargarPreguntaSesionPorSeed(seed)
		])

		if(numeroDePreguntas <= limit){
			return this.getPreguntasPorCateogiraConPaginacionUseCase.exec(
				idCategoria,
				page,
				limit,
				seed
			);
		} else if(!session){
			const idPreguntas = await this.preguntaRepository.getIdsPreguntasByCategoria(idCategoria);

			const sessionEntity = PreguntaSession.crear({
				createdAt: new Date(),
				listaPreguntasId: idPreguntas,
				seed: seed
			})
			const idsDePagina = sessionEntity.obtenerPagina(1, limit);
			const [
				_,
				preguntas
			] = await Promise.all([
				this.preguntasSessionRepository.crearPreguntasSesion(sessionEntity),
				this.preguntaRepository.getVariasPreguntasPorIds(idsDePagina)
			]);

			return this.#estructurarPreguntas(preguntas, idsDePagina)
		} else {
			const idsDePagina = session.obtenerPagina(page, limit);
			const preguntas = await  this.preguntaRepository.getVariasPreguntasPorIds(idsDePagina)

			return this.#estructurarPreguntas(preguntas, idsDePagina)
		}
	}

	#estructurarPreguntas(preguntas: Pregunta[], idsDePagina: string[]){
		const preguntasOrdenadar = MezclarPreguntasService.ordenarPorListaIds(preguntas, idsDePagina)
		const preguntasRespuestasMezcladas = SelectorRespuestasService.generarPreguntasConRespuestasMezcladas(preguntasOrdenadar)
		const preguntasMapeadas = preguntasRespuestasMezcladas.map(MapsPregunta.toDto)
		return preguntasMapeadas;
	}
}