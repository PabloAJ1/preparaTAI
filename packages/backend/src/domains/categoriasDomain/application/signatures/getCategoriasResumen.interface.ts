import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";

export interface IGetCategoriasResumen {
	exec(tipoCategoria?: ('CUESTIONARIO'|'NORMAL'|'EXAMEN')): Promise<CategoriaResumenDto[]>;
}