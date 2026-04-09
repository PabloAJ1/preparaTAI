import { IContenidoPreguntaDto } from "../dtos/contenidoPregunta.dto";

export interface IDetectarCodigoEnEnunciadoService {
	exec(enunciado: string): Promise<IContenidoPreguntaDto>;
}