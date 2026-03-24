import { IPreguntaDto } from '../dtos/pregunta.dto';

export interface IExternalDataService {
	cargarDatos(): Promise<IPreguntaDto[]>;
}
