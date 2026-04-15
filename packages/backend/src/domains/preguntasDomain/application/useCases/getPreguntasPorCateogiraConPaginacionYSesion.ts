import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { IPreguntasSessionSevice } from "../../domain/signatures/PreguntasSessionSevice.interfcae";
import { IPreguntaPobladaDto } from "../dtos/preguntaPoblada.dto";
import { IGenerarListaPreguntasService } from "../signatures/GenerarListaPreguntasService.interface";
import { IGetPreguntasPorCateogiraConSession } from "../signatures/getPreguntasPorCateogiraConSession.interface";

/**
 * @version 4
 * @date 15-04-2026
 * He eliminado lo relativo a comprobar el tamaño de las preguntas para ver si merece la pena crear una sesion o no
 * Se puede simplificar el codigo, aunque hagamos trabajar un poco más a la base de datos, pero realmente hablamos de una consulta y un
 * almacenamiento, asi que definimos que siempre se cree la sesion
 * 
 * Hay que revisar y comparar con getById de practicas, ya que comparten bastante codigo, la funcion estructurarPreguntas es la misma, para lo demás 
 * podriamos establecer un patron stategy
 * 
 * Además deberiamos devolver una estructura más como la de practicas donde englobemos las preguntas en un array mejor que devolver el array de golpe
 * 
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

export class GetPreguntasPorCateogiraConSesion implements IGetPreguntasPorCateogiraConSession {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly preguntasSessionSevice: IPreguntasSessionSevice,
		private readonly generarListaPreguntasService: IGenerarListaPreguntasService,
	){}

	async exec(
		idCategoria: string,
		page = 1, 
		limit = 50,
		seed = 0
	): Promise<IPreguntaPobladaDto[]>{
		const idsPreguntas = await this.preguntaRepository.getIdsPreguntasByCategoria(idCategoria);
		const session = await this.preguntasSessionSevice.getOrCreate(seed, idsPreguntas)

		const idsDePagina = session.obtenerPagina(page, limit);
		const preguntas = await this.preguntaRepository.getVariasPreguntasPorIds(idsDePagina)

		return this.generarListaPreguntasService.generar(preguntas, idsDePagina)
	}
}