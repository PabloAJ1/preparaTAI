import { test, expect, describe, vi } from 'vitest';
import { ICategoriaRepository } from '../../../../../src/domains/categoriasDomain/domain/repositories/categoriaRepository.interface';
import { GetCategoriasByTipo } from '../../../../../src/domains/categoriasDomain/application/useCases/getCategoriasResumen';
import { Categoria } from '../../../../../src/domains/categoriasDomain/domain/entities/Categoria';
import { IPreguntasPort } from '../../../../../src/domains/categoriasDomain/application/interfaces/preguntasPort.interface';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { PreguntaAdapterPort } from '../../../../../src/domains/categoriasDomain/infrastructure/adapters/ports/preguntaAdapter.service';

describe('#Test > integration > domains > categoriaDomain > application > usesCases > getCategoriaResumen ... ', () => {
	test('deberia devolver un resultado correcto con repos mockeados', async () => {
		const categoriasMock: Categoria[] = [
			Categoria.crear({ idCategoria: "1", nombreCategoria: 'Deportes' },),
			Categoria.crear({ idCategoria: "2", nombreCategoria: 'Tecnología' },)
		];

		const preguntasMock = 15;

		const repoMockCategorias: ICategoriaRepository = {
			getCategoriasByName: vi.fn(),
			getCategoriasById: vi.fn(),
			createBulkPreguntas: vi.fn(),
			getCategoriasByType: vi.fn(),
			getAllCategoriasExamenes: vi.fn(),
			getListOfCategorias: vi.fn(),
			createListOfCategorias: vi.fn(),
			createCategoria: vi.fn().mockResolvedValue(categoriasMock),
			getAllCategorias: vi.fn().mockResolvedValue(categoriasMock),
			getAllCategoriasNoCuestionarios: vi.fn().mockResolvedValue(categoriasMock),
			getAllCategoriasCuestionarios: vi.fn().mockResolvedValue(categoriasMock),
		};
		
		const repoMockPreguntas: IPreguntasPort = {
			getNumeroPreguntasPorCategoria: vi.fn().mockResolvedValue(preguntasMock),
		};

		const getCategoriaResumen = new GetCategoriasByTipo(
			repoMockCategorias,
			repoMockPreguntas
		)

		const resultado = await getCategoriaResumen.exec();

		expect(repoMockCategorias.getAllCategoriasNoCuestionarios).toHaveBeenCalledOnce();
		expect(repoMockPreguntas.getNumeroPreguntasPorCategoria).toHaveBeenCalledTimes(2);

		expect(resultado.length).toBe(2);
		expect(resultado[0]).toHaveProperty("id")
		expect(resultado[0]).toHaveProperty("nombre")
		expect(resultado[0]).toHaveProperty("numeroPreguntas")
		expect(resultado[0].nombre).toBe("Deportes")
		expect(resultado[0].numeroPreguntas).toBe(15)
		expect(resultado[1]).toHaveProperty("id")
		expect(resultado[1]).toHaveProperty("nombre")
		expect(resultado[1]).toHaveProperty("numeroPreguntas")
		expect(resultado[1].nombre).toBe("Tecnología")
		expect(resultado[1].numeroPreguntas).toBe(15)
	});

	test('deberia devolver un resultado correcto con no mockeados', async () => {
		const categoriasMySQLRepository = new CategoriaRepositoryMongo();
		const getEstadisticasPorCategoria = { exec: vi.fn() }
		const preguntaAdapterPort = new PreguntaAdapterPort(getEstadisticasPorCategoria)


		const getCategoriaResumen = new GetCategoriasByTipo(
			categoriasMySQLRepository,
			preguntaAdapterPort
		)

		const resultado = await getCategoriaResumen.exec();

		resultado.forEach(r => {
			expect(r).toHaveProperty("id");
			expect(r).toHaveProperty("nombre");
			expect(r).toHaveProperty("numeroPreguntas");
			expect(r.numeroPreguntas).toBeGreaterThan(0);
		})
	});
});