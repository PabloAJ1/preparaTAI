import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";

export interface IGetCategoriasByTipo {
	exec(tipoCategoria?: ('CUESTIONARIO'|'NORMAL'|'EXAMEN')): Promise<CategoriaResumenDto[]>;
}