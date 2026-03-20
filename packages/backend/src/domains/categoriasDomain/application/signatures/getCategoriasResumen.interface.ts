import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";

export interface IGetCategoriasResumen {
	exec(): Promise<CategoriaResumenDto[]>;
}