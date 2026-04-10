import { test, describe } from 'vitest';
import { GestionBDCategoriasRepositoryMongoDB } from '../../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/gestionBDCategoriasRepositoryMongoDB';

describe('#Test > integration > domains > categoriaDomain > infrastructure > mongo > repositories > gestionBDCategoriasRepositoryMongoDB ... ', () => {
	const path = `./test/categoriasDomain/helpers/categoriasPreparaTAIv3${new Date().getTime()}_test.json`
	const gestionBDCategoriasRepositoryMongoDB = new GestionBDCategoriasRepositoryMongoDB(path);

	test('deberia realizar un backup de la db', async () => {
		await gestionBDCategoriasRepositoryMongoDB.backup();
	});
});