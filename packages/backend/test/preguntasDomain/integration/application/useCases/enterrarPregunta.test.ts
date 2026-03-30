import { test, expect, describe, beforeAll } from 'vitest';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { EnterrarPregunta } from '../../../../../src/domains/preguntasDomain/application/useCases/enterrarPregunta';
import { GetPreguntaById } from '../../../../../src/domains/preguntasDomain/application/useCases/getPreguntaById';
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

	const getPreguntaByIdUseCase = new GetPreguntaById(preguntasRepositoryMongoDB)
	const enterrarPreguntaUseCase = new EnterrarPregunta(
		preguntasRepositoryMongoDB
	)

	test('deberia leer el fichero y devolver las SQL', async () => {
		//Pre condiciones
		expect(pregunta).toHaveProperty("descartada")
		expect(pregunta.descartada).toBeFalsy();
		
		await enterrarPreguntaUseCase.exec(pregunta.id);
		const preguntaEnterrada = await getPreguntaByIdUseCase.exec(pregunta.id)

		expect(preguntaEnterrada).toHaveProperty("descartada")
		expect(preguntaEnterrada.descartada).toBeTruthy();
	});

});
