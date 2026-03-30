import { ICategoriaDto } from './categoria.dto';
import { IRespuestaDto } from './respuesta.dto';

export interface IPreguntaMigrationDto {
	id: string;
	enunciado: string;
	estado: string;
	respuestas: IRespuestaDto[];
	categorias: ICategoriaDto[];
}
