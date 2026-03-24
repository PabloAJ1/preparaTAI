import { GetSQLPlana } from './application/useCases/getSQLPlana';
import { ExcelAdapterService } from './infrastructure/adapters/ports/excelAdapter.service';
import { FileSaveAdapter } from './infrastructure/adapters/ports/fileSaveAdapter.service';
import { ExcelLoader } from './infrastructure/excel/services/excelLoader.service';
import { SaveFile } from './infrastructure/fileSystem/services/saveFile.service';
import { PreguntasSQLService } from './infrastructure/sql/service/preguntasSQL.service';

export const containerBuild = () => {
	const path = ""
	const excelLoader = new ExcelLoader();
	const excelAdapterService = new ExcelAdapterService(excelLoader, path);
	const preguntasSQLService = new PreguntasSQLService();
	const saveFile = new SaveFile('./');
	const fileSaveAdapter = new FileSaveAdapter(saveFile);

	const getSQLPlana = new GetSQLPlana(
		excelAdapterService,
		preguntasSQLService,
		fileSaveAdapter
	);

	return {
		getSQLPlana,
	};
};
