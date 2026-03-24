import { test, expect, describe } from 'vitest';
import { CategoriasMySQLRepository } from '../../../../../src/domains/categoriasDomain/infrastructure/mysql/repositories/categoriasMySQLRepository.repository';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { MigracionCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/migracionCategorias';

describe('#Test > integration > domains > categoriaDomain > application > usesCases > migracionCategorias ... ', () => {
	const originRepository = new CategoriasMySQLRepository();
	const destinyRepository = new CategoriaRepositoryMongo();
	const useCase = new MigracionCategorias(
		originRepository,
		destinyRepository
	)

	test('deberia devolver un resultado correcto con repos mockeados', async () => {
		try{
			await useCase.exec();
			expect(true).toBeTruthy();
		}catch(err){
			throw new Error("No deberia llegar aqui. Err.: " + err);
		}
	});
});