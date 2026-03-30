import { Pregunta } from '../../domain/entities/Pregunta';
import { ICategoriaDto } from '../dtos/categoria.dto';
import { IPreguntaMigrationDto } from '../dtos/preguntaMigration.interface';

export interface IGeneradorDePreguntasDePracticaService {
	exec(
		preguntas: IPreguntaMigrationDto[],
		categorias: Map<string, ICategoriaDto>
	): Pregunta[];
}
