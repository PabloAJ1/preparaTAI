import { GetNumeroPreguntas } from "./application/useCases/getNumeroDePreguntas"
import { PreguntaRepositoryMySQL } from "./infrastructure/mysql/repositories/preguntaRepositoryMySQL.repository"

export const preguntasBuilder = () => {
	const preguntasRepositoryMySQL = new PreguntaRepositoryMySQL();
	const getNumeroPreguntas = new GetNumeroPreguntas(preguntasRepositoryMySQL)

	return {
		getNumeroPreguntas
	}
}