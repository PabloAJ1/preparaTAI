import { test, expect, describe } from 'vitest';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { InicializarPreguntas } from '../../../../../src/domains/preguntasDomain/application/useCases/inicializarPreguntas';
import { PreguntasExternalAtlasService } from '../../../../../src/domains/preguntasDomain/infrastructure/atlas/services/PreguntasExternalAtlas.service';
import { PreguntasSyncPort } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/preguntasSyncPort.service';

describe('#Test > integration > domains > preguntasDomain > application > usesCases > inicializarPreguntas ... ', () => {
	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	const getPreguntasFromAtlas = new PreguntasExternalAtlasService();
	const portPreguntasSync = new PreguntasSyncPort(getPreguntasFromAtlas)

	const inicializarPreguntasUseCase = new InicializarPreguntas(
		portPreguntasSync,
		preguntasRepositoryMongoDB
	)

	test('no deberia devolver ningun error, este test lo hacemos sin borrar la db', async () => {
		
		try{
			await inicializarPreguntasUseCase.exec();
			expect(true).toBeTruthy();
		}catch(err){
			throw new Error("No deberia llegar aqui. Err.: " + err)
		}
	});

	test('no deberia devolver ningun error, este test lo hacemos borrando la db', async () => {
		
		try{
			await inicializarPreguntasUseCase.exec({ clearDB: true });
			expect(true).toBeTruthy();
		}catch(err){
			throw new Error("No deberia llegar aqui. Err.: " + err)
		}
	});

});
