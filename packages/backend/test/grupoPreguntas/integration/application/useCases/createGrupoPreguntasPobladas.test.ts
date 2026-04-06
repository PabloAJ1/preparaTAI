import { test, expect, describe, vi } from 'vitest';
import { CreateGrupoPreguntasPobladas } from '../../../../../src/domains/grupoPreguntas/applications/useCases/createGrupoPreguntasPobladas';
import { PreguntasPortService } from '../../../../../src/domains/grupoPreguntas/infrastructure/adapters/ports/preguntasPort.service';
import { GrupoPreguntasRepositoryMongo } from '../../../../../src/domains/grupoPreguntas/infrastructure/mongo/repositories/grupoPreguntasRepositoryMongo.repository';
import { generarGrupoPreguntasPobladasDto } from '../../../fakers/grupoPreguntasPobladas.dto';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { CrearPregunta } from '../../../../../src/domains/preguntasDomain/application/useCases/createPregunta';
import { IGetVariasPreguntasPorId } from '../../../../../src/domains/grupoPreguntas/infrastructure/adapters/signatures/getVariasPreguntasPorId.interface';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { BuscarOCrearCategoria } from '../../../../../src/domains/categoriasDomain/application/useCases/buscarOCrearCategoria';

describe('#Test > integration > domains > categoriaDomain > application > usesCases > getCategoriaResumen ... ', () => {
	const grupoPreguntasMongoRepository = new GrupoPreguntasRepositoryMongo();
	const preguntasMongoRepository = new PreguntaRespositoryMongoDB();
	const categoriaMongoRepository = new CategoriaRepositoryMongo();

	const createPreguntasUseCase = new CrearPregunta(preguntasMongoRepository);
	const getVariasPreguntasPorIdMock: IGetVariasPreguntasPorId = { exec: vi.fn() };
	const getBuscarOCrearCategoriaPorNombre = new BuscarOCrearCategoria(categoriaMongoRepository)
	const preguntasPortService = new PreguntasPortService(
		getVariasPreguntasPorIdMock, 
		createPreguntasUseCase, 
		getBuscarOCrearCategoriaPorNombre
	)
	const generarGrupoPreguntasUseCase = new CreateGrupoPreguntasPobladas(grupoPreguntasMongoRepository, preguntasPortService);

	test('deberia devolver un resultado correcto con repos mockeados', async () => {
		const generarDto = generarGrupoPreguntasPobladasDto();
		const result = await generarGrupoPreguntasUseCase.exec(generarDto);

		expect(result).toHaveProperty("id")
		expect(result).toHaveProperty("textoPre")
		expect(result).toHaveProperty("textoPos")
		expect(result).toHaveProperty("codigo")
		expect(result).toHaveProperty("idPreguntas")
		expect(result.codigo).toHaveProperty("codigo")
		expect(result.codigo).toHaveProperty("lenguaje")

		expect(result.id).not.toBe("nuevo")
		expect(result.textoPre).toBe(generarDto.textoPre)
		expect(result.textoPos).toBe(generarDto.textoPos)
		expect(result.codigo.codigo).toBe(generarDto.codigo.codigo)
		expect(result.codigo.lenguaje).toBe(generarDto.codigo.lenguaje)
	});
});