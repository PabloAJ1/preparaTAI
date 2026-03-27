import { readFile, utils, set_fs } from 'xlsx';
import fs from 'node:fs';
import { IExcelDto } from '../dtos/excel.dto';
import { IExcelLoader } from '../../adapters/interfaces/excelLoader.interface';

export class ExcelLoader implements IExcelLoader {
	async cargarDatosFichero(path: string): Promise<IExcelDto[]> {
		set_fs(fs);
		const workbook = readFile(path, { cellDates: true });
		const rows: IExcelDto[] = utils.sheet_to_json(
			workbook.Sheets[workbook.SheetNames[0]]
		);

		return rows;
	}
}
