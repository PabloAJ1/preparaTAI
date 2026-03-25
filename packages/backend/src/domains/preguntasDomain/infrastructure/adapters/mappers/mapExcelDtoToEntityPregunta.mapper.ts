import { IPreguntaDto } from '../../../application/dtos/pregunta.dto';
import { IExcelDto } from '../../excel/dtos/excel.dto';

export class MapExcelDtoToEntityPregunta {
	public static mapMapExcelDtoToEntityPregunta(
		dtoExcel: IExcelDto
	): IPreguntaDto {
		const categorias = ['2026', `Examen-${dtoExcel.fuente}`];
		if(dtoExcel.categoria1 !== undefined && dtoExcel.categoria1 !== ""){
			categorias.push(dtoExcel.categoria1)
			if(dtoExcel.categoria2 !== undefined && dtoExcel.categoria2 !== ""){
				categorias.push(dtoExcel.categoria1)
						if(dtoExcel.categoria3 !== undefined && dtoExcel.categoria3 !== ""){
							categorias.push(dtoExcel.categoria1)			
				}
			}
		}

		return {
			id: "0",
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
			estadisticas: { aciertos: 0, fallos: 0, total: 0}
		};
	}
}
