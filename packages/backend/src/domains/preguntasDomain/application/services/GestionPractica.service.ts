import { CreatePracticaFromData } from "../../domain/factories/createPracticaFromData";
import { IPracticaRepository } from "../../domain/repositories/practicaRepository.interface";
import { PreguntaNoEncontradaById } from "../errors/PreguntaNoEncontradaById.error";
import { IGestionPracticasService } from "../signatures/gestionPractica.interface";

export class GestionPracticaService implements IGestionPracticasService {
	constructor(
		private readonly practicaRepository: IPracticaRepository,
	){}

	async gestionarPracticaNuevaOAniadir(
		nombrePractica: string, 
		preguntas: { idPregunta: string; respuestaCorrectaId: string; }[]
	): Promise<void> {
		try{
			const buscarPracticaExistente = await this.practicaRepository.getPracticaPorNombre(nombrePractica)
			buscarPracticaExistente.aninadirPreguntas(
				preguntas
			)
			await this.practicaRepository.updatePractica(buscarPracticaExistente);
		}catch(err){
			if(err instanceof PreguntaNoEncontradaById){
				const practica = CreatePracticaFromData.crearFromDatos(preguntas , nombrePractica)		
				await this.practicaRepository.createPractica(practica);
			} else{
				throw err;
			}
		}
	}
}