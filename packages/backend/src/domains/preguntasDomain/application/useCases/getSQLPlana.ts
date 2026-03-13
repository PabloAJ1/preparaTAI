import { IPreguntaRepositoryPlano } from "../../domain/repositories/preguntasRepositoryPlano.interface";
import { IExternalDataService } from "../ports/excelAdapterService.interface";
import { MapsPregunta } from "../mappers/mapDtoToEntityPregunta.mapper";
import { IGetSQLPlana } from "../signatures/getSQLPlana.interface";
import { IFileSaveService } from "../ports/fileAdapterService.interface";

export class GetSQLPlana implements IGetSQLPlana {
	constructor(
		private readonly excelAdapterService: IExternalDataService,
		private readonly preguntaRepositoryPlano: IPreguntaRepositoryPlano,
		private readonly fileSaveService: IFileSaveService
	){}

	async exec(path: string): Promise<string[]> {
		const externalData = await this.excelAdapterService.cargarDatos(path);
		const sqlString = this.preguntaRepositoryPlano.crear(externalData.map(MapsPregunta.toEntity));

		await this.fileSaveService.save(sqlString);

		return sqlString;
	}
}