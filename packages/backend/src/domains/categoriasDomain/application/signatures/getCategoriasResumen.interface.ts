import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";

export interface IGetCategoriasByTipo {
	exec(tipoCategoria?: ('PRACTICA'|'NORMAL'|'EXAMEN' | "GRUPOPREGUNTAS")): Promise<CategoriaResumenDto[]>;
}