import { test, describe } from 'vitest';
import { GestionBDGrupoPreguntasRepositoryMongoDB } from '../../../../../../src/domains/grupoPreguntas/infrastructure/mongo/repositories/gestionBDPreguntasRepositoryMongoDB';

describe('#Test > integration > domains > grupoPreguntasDomain > infrastructure > mongo > repositories > gestionBDGrupoPreguntasRepositoryMongoDB ... ', () => {
	const path = `./test/categoriasDomain/helpers/preguntasPreparaTAIv3${new Date().getTime()}_test.json`
	const gestionBDGrupoPreguntasRepositoryMongoDB = new GestionBDGrupoPreguntasRepositoryMongoDB(path);

	test('deberia realizar un backup de la db', async () => {
		await gestionBDGrupoPreguntasRepositoryMongoDB.backup();
	});
});