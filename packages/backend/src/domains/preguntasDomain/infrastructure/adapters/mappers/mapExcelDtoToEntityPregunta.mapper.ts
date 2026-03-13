import { IPreguntaDto } from "../../../application/dtos/pregunta.dto";
import { IExcelDto } from "../../excel/dtos/excel.dto";

export class MapExcelDtoToEntityPregunta {
	public static mapMapExcelDtoToEntityPregunta(dtoExcel: IExcelDto): IPreguntaDto {
		return {
			enunciado: dtoExcel.enunciado,
			respuestas: [
				{
					enunciado: dtoExcel.respuesta1,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === "a"
				},				{
					enunciado: dtoExcel.respuesta2,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === "b"
				},				{
					enunciado: dtoExcel.respuesta3,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === "c"
				},				{
					enunciado: dtoExcel.respuesta4,
					correcta: dtoExcel.correcta.toLocaleLowerCase() === "d"
				},
			]
		}
	}
}