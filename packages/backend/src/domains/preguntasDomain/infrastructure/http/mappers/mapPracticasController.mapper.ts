import { components } from "../../../../../types/openapi";
import { IPracticaPobladaDto } from "../../../application/dtos/practicaPoblada.dto";
import { PracticasConEstadisticas } from "../../../application/dtos/practicasConEstadisticas.dto";

type TCategoriaResumen = components['schemas']['CategoriaResumen'];
type TPractica = components['schemas']['Practica'];

export class MapPracticasController {
	static toCategoriaResumen(practicasConEstadisticasDto: PracticasConEstadisticas): TCategoriaResumen {
		return {
			estadisticas: practicasConEstadisticasDto.estadisticas,
			id: practicasConEstadisticasDto.idPractica,
			nombre: practicasConEstadisticasDto.nombrePractica,
			numeroPreguntas: practicasConEstadisticasDto.numeroDePreguntas
		}
	}

	static toPracticaResponse(practicaPoblada: IPracticaPobladaDto): TPractica {
		return {
			idPractica: practicaPoblada.idPractica,
			nombrePractica: practicaPoblada.nombrePractica,
			preguntas: practicaPoblada.preguntas.map(p => {
				return {	
					enunciado: p.enunciado,
					estadisticas: p.estadisticas,
					estado: p.estado,
					id: p.id,
					respuestas: p.respuestas,
					codigo: p.codigo
				}
			})
		}
	}
}