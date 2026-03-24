import { IPreguntaDto } from '../../../application/dtos/pregunta.dto';
import { IExternalDataService } from '../../../application/ports/excelAdapterService.interface';
import { IExcelLoader } from '../interfaces/excelLoader.interface';
import { MapExcelDtoToEntityPregunta } from '../mappers/mapExcelDtoToEntityPregunta.mapper';

export class ExcelAdapterService implements IExternalDataService {
	constructor(
		private readonly excelLoader: IExcelLoader,
		private readonly outputPath: string,
	) {}

	async cargarDatos(): Promise<IPreguntaDto[]> {
		const excelData = await this.excelLoader.cargarDatosFichero(this.outputPath);
		const datos =  excelData.map(
			MapExcelDtoToEntityPregunta.mapMapExcelDtoToEntityPregunta
		);
		return datos;
	}
}
