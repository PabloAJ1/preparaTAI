import { describe, it, expect, vi } from 'vitest';
import { ExcelAdapterService } from '../../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/excelAdapter.service';
import { IExcelLoader } from '../../../../../../src/domains/preguntasDomain/infrastructure/adapters/interfaces/excelLoader.interface';

describe('ExcelAdapterService - Stub', () => {
	it('debería devolver el elemento mapeado', async () => {
		const excelLoaderStub: IExcelLoader = {
			cargarDatosFichero: async () =>
				[
					{
						fuente: '9999',
						enunciado:
							'¿Cuáles el objeto principal de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y Garantía de los Derechos Digitales?',
						respuesta1:
							'Adaptar el ordenamiento al Reglamento General de Protección de Datos y garantizar los derechos digitales',
						respuesta2:
							'Ampliar el Reglamento General de Protección de Datos y eliminar derechos digitales',
						respuesta3: 'Regular únicamente los datos personales de menores',
						respuesta4: 'Ampliar el ámbito personal de libre uso de datos ',
						correcta: 'a',
						categoria: '2026',
					},
				] as any,
		};

		const service = new ExcelAdapterService(excelLoaderStub, 'fake.xlsx');

		const result = await service.cargarDatos();

		expect(result.length).toBe(1);
	});
});

describe.skip('ExcelAdapterService - Mock', () => {
	it('debería llamar a cargarDatosFichero con el path correcto', async () => {
		const cargarDatosFichero = vi.fn().mockResolvedValue([
			{
				fuente: '9999',
				enunciado:
					'¿Cuáles el objeto principal de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y Garantía de los Derechos Digitales?',
				respuesta1:
					'Adaptar el ordenamiento al Reglamento General de Protección de Datos y garantizar los derechos digitales',
				respuesta2:
					'Ampliar el Reglamento General de Protección de Datos y eliminar derechos digitales',
				respuesta3: 'Regular únicamente los datos personales de menores',
				respuesta4: 'Ampliar el ámbito personal de libre uso de datos ',
				correcta: 'a',
				categoria: '2026',
			},
		]);

		const excelLoaderMock: IExcelLoader = {
			cargarDatosFichero,
		};

		const service = new ExcelAdapterService(excelLoaderMock, 'test.xlsx');

		await service.cargarDatos();

		expect(cargarDatosFichero).toHaveBeenCalledWith('test.xlsx');
		expect(cargarDatosFichero).toHaveBeenCalledTimes(1);
	});
});
