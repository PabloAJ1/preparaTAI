import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";

export interface IGetCategoriasByTipoResumen {
	exec(tipoCategoria?: ('PRACTICA'|'NORMAL'|'EXAMEN' | "GRUPOPREGUNTAS")): Promise<CategoriaResumenDto[]>;
}