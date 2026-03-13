import { test, expect, describe, beforeAll, afterAll } from 'vitest'
import { ExcelLoader } from "../../../../../src/domains/preguntasDomain/infrastructure/excel/services/excelLoader.service"
import { SaveFile } from "../../../../../src/domains/preguntasDomain/infrastructure/fileSystem/services/saveFile.service"
import { ExcelAdapterService } from "../../../../../src/domains/preguntasDomain/infrastructure/adapters/adapters/excelAdapter.service"
import { FileSaveAdapter } from "../../../../../src/domains/preguntasDomain/infrastructure/adapters/adapters/fileSaveAdapter.service"
import { PreguntasSQLService } from "../../../../../src/domains/preguntasDomain/infrastructure/sql/service/preguntasSQL.service"
import { GetSQLPlana } from "../../../../../src/domains/preguntasDomain/application/useCases/getSQLPlana"

describe('#Test > integration > domains > preguntasDomain > application > usesCases > getSQLPLana ... ', () => {
	const excelLoader = new ExcelLoader();
	const excelAdapterService = new ExcelAdapterService(excelLoader);
	const preguntasSQLService = new PreguntasSQLService();
	const saveFile = new SaveFile("./packages/backend/test/preguntasDomain/helpers/nuevas.sql");
	const fileSaveAdapter = new FileSaveAdapter(saveFile);
	const getSQLPlana = new GetSQLPlana(
		excelAdapterService,
		preguntasSQLService,
		fileSaveAdapter
	);
	
	test("deberia leer el fichero y devolver las SQL", async () => {
		const path = './packages/backend/test/preguntasDomain/helpers/20260311.xlsx';
		const result = await getSQLPlana.exec(path);
		console.log(result);
	});
});
