import { IExcelDto } from "../../excel/dtos/excel.dto";

export interface IExcelLoader {
	cargarDatosFichero(
        path: string
    ) : Promise<IExcelDto[]>
}