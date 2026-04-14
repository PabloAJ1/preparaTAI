import { CodigoVo } from "../../../../shared/domains/valueObjects/codigo.vo";
import { Pregunta } from "../../domain/entities/Pregunta";
import { IPreguntaRepository } from "../../domain/repositories/preguntasRepository.interface";
import { ContenidoPregunta } from "../../domain/valueObjects/contenidoPregunta.vo";
import { RespuestaVo } from "../../domain/valueObjects/RespuestaVo";
import { IPreguntaDto } from "../dtos/pregunta.dto";
import { EstadoHelper } from "../../domain/helpers/estado.helper";

/**
 * @author Pablo Alonso
 * @date 13/04/2026
 * Esto hay que revisarlo, lo he hecho muy vibe coding y habria que separar responsabilidades como minimo.
 * Tambien se está pasando toda la estructura desde el front (todavia no lo he desarrollado, pero se que va a dar algun problema)
 * Seguramente lo mejor a la hora de realizar una actualizacion de practicas sería pasar una estructura más simple como
 * [ pregunta - respuesta correcta ] y el identificador
 * Tambien, estaría bien hacer una verificación de preguntas existentes, por si se introduce varias veces la misma pregunta
 */
export class AgregarPreguntasAPracticas {
	constructor(private readonly preguntaRepository: IPreguntaRepository) {}

	async exec(preguntasDto: IPreguntaDto[], idPractica: string){
		const preguntasExistentes =
		await this.preguntaRepository.getPreguntasPorCategoria(idPractica);

		const respuestasNuevas = this.#extraerRespuestasNuevas(preguntasDto);

		await Promise.all([
			this.#actualizarPreguntasExistentes(preguntasExistentes, respuestasNuevas),
			this.#crearNuevasPreguntas(preguntasDto, preguntasExistentes)
		]);
	}

	async #actualizarPreguntasExistentes(
		preguntas: Pregunta[],
		respuestasNuevas: RespuestaVo[]
	) {
		await Promise.all(
			preguntas.map(p => {
				p.actualizarRespuestas([...p.respuestas, ...respuestasNuevas]);
				return this.preguntaRepository.updatePregunta(p);
			})
		);
	}

	async #crearNuevasPreguntas(
		preguntasDto: IPreguntaDto[],
		preguntasExistentes: Pregunta[]
	) {
		if (preguntasExistentes.length === 0) {
			throw new Error("No hay preguntas existentes para inferir respuestas");
		}

		const respuestasBase = this.#normalizarRespuestasBase(
			preguntasExistentes[0].respuestas
		);

		const nuevasPreguntas = preguntasDto.map(dto =>
			this.#mapearAPregunta(dto, respuestasBase)
		);

		await this.preguntaRepository.createBulkPreguntas(nuevasPreguntas);
	}

	#normalizarRespuestasBase(respuestas: RespuestaVo[]): RespuestaVo[] {
		const falsas = respuestas.filter(r => !r.isCorrect);
		const verdadera = respuestas.find(r => r.isCorrect);

		if (!verdadera) {
			throw new Error("No hay respuesta correcta en base");
		}

		return [
			...falsas,
			RespuestaVo.crear({
				id: verdadera.id,
				enunciado: verdadera.enunciado,
				correcta: false
			})
		];
	}

	#mapearAPregunta(
		dto: IPreguntaDto,
		respuestasBase: RespuestaVo[]
	): Pregunta {
		const respuestaCorrectaDto = dto.respuestas.find(r => r.correcta);

		const respuestaCorrecta = RespuestaVo.crear({
			enunciado: respuestaCorrectaDto?.enunciado ?? "",
			correcta: true
		});

		const respuestasIncorrectas = respuestasBase.filter(
			r => r.enunciado !== respuestaCorrecta.enunciado
		);

		return Pregunta.crear({
			categorias: dto.categorias,
			enunciado: ContenidoPregunta.crearPregunta({
				enunciado: dto.enunciado,
				codigo: dto.codigo
					? CodigoVo.crearDesdeProps({ codigo: dto.codigo })
					: undefined
			}),
			estado: EstadoHelper.fromString(dto.estado),
			respuestas: [...respuestasIncorrectas, respuestaCorrecta]
		});
	}

	#extraerRespuestasNuevas(preguntas: IPreguntaDto[]): RespuestaVo[] {
		return preguntas.flatMap(p =>
			p.respuestas.map(r =>
				RespuestaVo.crear({
					enunciado: r.enunciado,
					correcta: false
				})
			)
		);
	}
}

