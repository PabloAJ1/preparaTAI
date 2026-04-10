import { test, describe } from 'vitest';
import { GestionBDPreguntasRepositoryMongoDB } from '../../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/gestionBDPreguntasRepositoryMongoDB';

describe('#Test > integration > domains > categoriaDomain > infrastructure > mongo > repositories > gestionBDCategoriasRepositoryMongoDB ... ', () => {
	const path = `./test/preguntasDomain/helpers/preguntasPreparaTAIv3${new Date().getTime()}_test.json`
	const gestionBDPreguntasRepositoryMongoDB = new GestionBDPreguntasRepositoryMongoDB(path);

	test('deberia realizar un backup de la db', async () => {
		await gestionBDPreguntasRepositoryMongoDB.backup();
	});
});