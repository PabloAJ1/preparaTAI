import { test, expect, describe } from 'vitest';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { CategoriasExternalAtlasService } from '../../../../../src/domains/categoriasDomain/infrastructure/atlas/services/categoriasExternalAtlas.service';
import { CategoriasSyncService } from '../../../../../src/domains/categoriasDomain/infrastructure/adapters/ports/categoriasSync.service';
import { InicializarCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/inicializarCategorias';

describe('#Test > integration > domains > categoriasDomain > application > usesCases > inicializarCategorias ... ', () => {
	const categoriaMongRepository = new CategoriaRepositoryMongo();
	const getCategoriasFromAtlas = new CategoriasExternalAtlasService();
	const portCategoriasSync = new CategoriasSyncService(
		getCategoriasFromAtlas
	)

	const inicializarCategoriasUseCase = new InicializarCategorias(
		portCategoriasSync,
		categoriaMongRepository
	)

	test('no deberia devolver ningun error, este test lo hacemos sin borrar la db', async () => {
		
		try{
			await inicializarCategoriasUseCase.exec();
			expect(true).toBeTruthy();
		}catch(err){
			throw new Error("No deberia llegar aqui. Err.: " + err)
		}
	});

	test('no deberia devolver ningun error, este test lo hacemos borrando la db', async () => {
		
		try{
			await inicializarCategoriasUseCase.exec({ clearDB: true });
			expect(true).toBeTruthy();
		}catch(err){
			throw new Error("No deberia llegar aqui. Err.: " + err)
		}
	});

});
