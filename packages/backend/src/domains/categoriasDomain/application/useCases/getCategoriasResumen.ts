import { ICategoriaRepository } from "../../domain/repositories/categoriaRepository.interface";
import { CategoriaResumenDto } from "../dtos/categoriasResumen.dto";
import { IPreguntasPort } from "../interfaces/preguntasPort.interface";
import { MapCateogiraResumen } from "../mappers/mapCategoriasResumen.mapper";
import { IGetCategoriasResumen } from "../signatures/getCategoriasResumen.interface";

export class GetCategoriasResumen implements IGetCategoriasResumen {
	constructor(
		private readonly categoriasRepositories: ICategoriaRepository,
		private readonly preguntasPort: IPreguntasPort
	){}

	async exec(): Promise<CategoriaResumenDto[]> {
		const result = await this.categoriasRepositories.getAllCategoriasNoCuestionarios();
		const returnResult: CategoriaResumenDto[] = [];

		for(const categoria of result){
			const numeroPreguntas = await this.preguntasPort.getNumeroPreguntasPorCategoria(categoria)
			returnResult.push(MapCateogiraResumen.toDto(categoria, numeroPreguntas))
		}

		return returnResult
	}
}