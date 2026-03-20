import { test, expect, describe, vi } from 'vitest';
import { ICategoriaRepository } from '../../../../../src/domains/categoriasDomain/domain/repositories/categoriaRepository.interface';
import { GetCategoriasResumen } from '../../../../../src/domains/categoriasDomain/application/useCases/getCategoriasResumen';
import { Categoria } from '../../../../../src/domains/categoriasDomain/domain/entities/Categoria';
import { IPreguntasPort } from '../../../../../src/domains/categoriasDomain/application/interfaces/preguntasPort.interface';
import { CategoriasMySQLRepository } from '../../../../../src/domains/categoriasDomain/infrastructure/mysql/repositories/categoriasMySQLRepository.repository';
import { PreguntaAdapterPort } from '../../../../../src/domains/categoriasDomain/infrastructure/adapters/ports/preguntaAdapterPort';
import { PreguntaRepositoryMySQL } from '../../../../../src/domains/preguntasDomain/infrastructure/mysql/preguntaRepositoryMySQL.repository';
import { GetNumeroPreguntasPorCategoria } from '../../../../../src/domains/preguntasDomain/application/useCases/getNumeroPreguntasPorCategoria';

describe('#Test > integration > domains > categoriaDomain > application > usesCases > getCategoriaResumen ... ', () => {
	test('deberia devolver un resultado correcto con repos mockeados', async () => {
		const categoriasMock: Categoria[] = [
			Categoria.crear({ idCategoria: "1", nombreCategoria: 'Deportes' },),
			Categoria.crear({ idCategoria: "2", nombreCategoria: 'Tecnología' },)
		];

		const preguntasMock = 15;

		const repoMockCategorias: ICategoriaRepository = {
			getAllCategorias: vi.fn().mockResolvedValue(categoriasMock),
			getAllCategoriasNoCuestionarios: vi.fn().mockResolvedValue(categoriasMock),
			getAllCategoriasCuestionarios: vi.fn().mockResolvedValue(categoriasMock),
		};
		
		const repoMockPreguntas: IPreguntasPort = {
			getNumeroPreguntasPorCategoria: vi.fn().mockResolvedValue(preguntasMock),
		};

		const getCategoriaResumen = new GetCategoriasResumen(
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
		const categoriasMySQLRepository = new CategoriasMySQLRepository();
		
		const preguntasMySQLRepository = new PreguntaRepositoryMySQL();
		const getNumeroPreguntasPorCategoria = new GetNumeroPreguntasPorCategoria(preguntasMySQLRepository);
		const preguntaAdapterPort = new PreguntaAdapterPort(getNumeroPreguntasPorCategoria)


		const getCategoriaResumen = new GetCategoriasResumen(
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