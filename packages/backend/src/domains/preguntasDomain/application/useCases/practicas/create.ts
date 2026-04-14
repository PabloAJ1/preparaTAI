import { Pregunta } from "../../../domain/entities/Pregunta";
import { EstadoHelper } from "../../../domain/helpers/estado.helper";
import { IPreguntaRepository } from "../../../domain/repositories/preguntasRepository.interface";
import { IGestionPracticasService } from "../../signatures/gestionPractica.interface";
import { ContenidoPregunta } from "../../../domain/valueObjects/contenidoPregunta.vo";
import { RespuestaVo } from "../../../domain/valueObjects/RespuestaVo";
import { IPracticaCreateDto } from "../../dtos/practicaCreate.dto";
import { ICategoriaAdapterService } from "../../ports/categoriaAdapterService.interface";
import { ICreatePractica } from "../../signatures/createPractica.interface";

export class CreatePractica implements ICreatePractica {
	constructor(
		private readonly preguntaRepository: IPreguntaRepository,
		private readonly categoriaAdapterPort: ICategoriaAdapterService,
		private readonly gestionPracticasService: IGestionPracticasService,
	){}

	async exec(practicaNueva: IPracticaCreateDto): Promise<void> {
		const nombrePractica = practicaNueva.nombrePractica;
		const estadoGlobal = EstadoHelper.fromString(practicaNueva.estado)

		const categoria = await this.categoriaAdapterPort.searchAndCreateCategoria({
			idCategoria: 'nuevo', //Se crea en su dominio
			nombreCategoria: nombrePractica, //Todas traen el mismo valor
			tipo: 'PRACTICA'
		});

		const respuestasCorrectasPorPregunta : { idPregunta: string; respuestaCorrectaId: string }[] = []
		const listaPreguntas = []

		for(const p of practicaNueva.pregunta){
			const respuestaCorrecta = RespuestaVo.crear({
				enunciado: p.respuesta , //Solo se pasa una desde el front, la correcta
				correcta: true
			})

			const pregunta = Pregunta.crear({
				categorias: [categoria.idCategoria],
				enunciado: ContenidoPregunta.crearPregunta({
					enunciado: p.enunciado
				}),
				estado: estadoGlobal,
				respuestas: [respuestaCorrecta]
			})
						
			respuestasCorrectasPorPregunta.push({ idPregunta: pregunta.idPregunta, respuestaCorrectaId: respuestaCorrecta.id })
			listaPreguntas.push(pregunta)
		}
		await this.preguntaRepository.createBulkPreguntas(listaPreguntas);

		await this.gestionPracticasService.gestionarPracticaNuevaOAniadir(
			nombrePractica, 
			respuestasCorrectasPorPregunta
		)
	}
}