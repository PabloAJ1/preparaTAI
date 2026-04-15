import { components } from "../../../../../types/openapi";
import { ICategoriaDto } from "../../../application/dtos/categoria.dto";

type TCategoria = components["schemas"]["Categoria"]

export class MapCategorias {
	static toReturnType(dto: ICategoriaDto): TCategoria {
		return {
			id: dto.idCategoria,
			nombre: dto.nombreCategoria,
			tipo: dto.tipo
		}
	}
	
	static toDto(body: TCategoria): ICategoriaDto {
		return {
			idCategoria: body.id,
			nombreCategoria: body.nombre,
			tipo: body.tipo
		}
	}
}