import { ICategoriaDto } from '../../../application/dtos/categoria.dto';
import { IPreguntaMigrationDto } from '../../../application/dtos/preguntaMigration.interface';
import { IExcelDto } from '../../excel/dtos/excel.dto';

export class MapExcelDtoToEntityPregunta {
	public static mapMapExcelDtoToEntityPregunta(
		dtoExcel: IExcelDto
	): IPreguntaMigrationDto {
		const categorias: ICategoriaDto[] = [
			...(dtoExcel.tipo !== 'DEFAULT' ? [dtoExcel.fuente] : []),
			dtoExcel.categoria1,
			dtoExcel.categoria2,
			dtoExcel.categoria3,
		]
		.filter((cat): cat is string => !!cat)
		.map((nombre, index) => ({
			idCategoria: '0',
			nombreCategoria: nombre,
			tipo: index === 0 ? dtoExcel.tipo ?? 'DEFAULT' : 'DEFAULT', // <-- fallback

		}));

		return {
			id: '0',
			enunciado: dtoExcel.enunciado,
			respuestas: [
				{
					enunciado: dtoExcel.respuesta1,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === 'a',
				},
				{
					enunciado: dtoExcel.respuesta2,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === 'b',
				},
				{
					enunciado: dtoExcel.respuesta3,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === 'c',
				},
				{
					enunciado: dtoExcel.respuesta4,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === 'd',
				},
			],
			categorias: categorias,
			estado: dtoExcel.estado,
		};
	}
}
