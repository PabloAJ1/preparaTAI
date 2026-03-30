import { IPreguntaMigrationDto } from '../dtos/preguntaMigration.interface';

export interface IExternalDataService {
	cargarDatos(): Promise<IPreguntaMigrationDto[]>;
}
