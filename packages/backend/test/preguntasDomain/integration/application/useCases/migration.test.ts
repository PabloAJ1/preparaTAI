import { test, expect, describe, vi } from 'vitest';
import { PreguntaRepositoryMySQL } from '../../../../../src/domains/preguntasDomain/infrastructure/mysql/repositories/preguntaRepositoryMySQL.repository';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { MigrationDB } from '../../../../../src/domains/preguntasDomain/application/useCases/migrations';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { GetAllCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/getAllCategorias';
import { CategoriaAdaperServive } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/categoriasAdapter.service';
import { ICreateListOfCategorias } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/signatures/createListOfCategorias.interface';
import { IGetListOfCategorias } from '../../../../../src/domains/categoriasDomain/application/signatures/getListOfCategorias.interface';
import { IBuscarOCrearCategoriaPorNombre } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/signatures/buscarOCrearCategoriaPorNombre.interface';

describe('#Test > integration > domains > preguntasDomain > application > usesCases > migration ... ', () => {
	const mockServiceListPort: IGetListOfCategorias = {
		exec: vi.fn(),
	};
	const mockServiceCreatePort: ICreateListOfCategorias = {
		exec: vi.fn(),
	};

	const buscarOCrearCategoriaMock: IBuscarOCrearCategoriaPorNombre = {
		exec: vi.fn(),
	};

	const categoriasRepository = new CategoriaRepositoryMongo();
	const getCategoriasUseCase = new GetAllCategorias(categoriasRepository)
	const getCategoriasServicePort = new CategoriaAdaperServive(
		getCategoriasUseCase, 
		mockServiceCreatePort,
		mockServiceListPort,
		buscarOCrearCategoriaMock
	);

	const originRepository = new PreguntaRepositoryMySQL();
	const destinyRepository = new PreguntaRespositoryMongoDB();
	const migrationCaseUse = new MigrationDB(
		originRepository,
		destinyRepository,
		getCategoriasServicePort
	)

	test('deberia leer el fichero y no devolver errores', async () => {
		try{
			await migrationCaseUse.exec();
			expect(true).toBeTruthy();
		}catch(e){
			console.error(e)
			throw new Error("No deberia llegar aqui. Err.: " + e)
		}
	});
});