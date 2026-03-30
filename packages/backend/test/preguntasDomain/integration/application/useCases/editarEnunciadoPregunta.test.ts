import { test, expect, describe, beforeAll } from 'vitest';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { UpdatePreguntaById } from '../../../../../src/domains/preguntasDomain/application/useCases/updatePreguntaById.interface';
import { CrearPregunta } from '../../../../../src/domains/preguntasDomain/application/useCases/createPregunta';
import { generarPreguntaDto } from '../../../fakers/pregunta.dto';
import { IPreguntaDto } from '../../../../../src/domains/preguntasDomain/application/dtos/pregunta.dto';

describe('#Test > integration > domains > preguntasDomain > application > usesCases > enterrarPregunta ... ', () => {
	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	let pregunta: IPreguntaDto;

	beforeAll(async () => {
		const preguntaDto = generarPreguntaDto();
		const crearPreguntaUseCase = new CrearPregunta(preguntasRepositoryMongoDB);
		pregunta = await crearPreguntaUseCase.exec(preguntaDto)
	})

	const updateEnunciadoPreguntaUseCase = new UpdatePreguntaById(
		preguntasRepositoryMongoDB
	)

	test('deberia leer el fichero y devolver las SQL', async () => {
		const preguntaDtoPseudoEditada = generarPreguntaDto();

		const preguntaEditada =await updateEnunciadoPreguntaUseCase.exec({
			enunciado: preguntaDtoPseudoEditada.enunciado,
			id: pregunta.id
		});

		expect(preguntaEditada).toHaveProperty("enunciado")
		expect(preguntaEditada.enunciado).toBe(preguntaDtoPseudoEditada.enunciado);
		expect(preguntaEditada.enunciado).not.toBe(pregunta.enunciado);
	});

});
