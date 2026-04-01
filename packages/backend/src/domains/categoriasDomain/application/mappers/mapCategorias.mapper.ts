import { Categoria } from "../../domain/entities/Categoria";
import { TipoCategortiaHelper } from "../../domain/helpers/tipoCategoria.helper";
import { ICategoriaDto } from "../dtos/categoria.dto";

export class MapCategoria {
	static toDto(categoria: Categoria): ICategoriaDto {
		return {
			idCategoria: categoria.idCategoria,
			nombreCategoria: categoria.nombreCategoria,
			tipo: categoria.tipoCategoriaString
		}
	}

	static toEntity(dto: ICategoriaDto): Categoria {
		return Categoria.crear({
			nombreCategoria: dto.nombreCategoria,
			tipo: TipoCategortiaHelper.fromString(dto.tipo)
		})
	}

	static toEntityWithId(dto: ICategoriaDto): Categoria {
		return Categoria.crear({
			nombreCategoria: dto.nombreCategoria,
			tipo: TipoCategortiaHelper.fromString(dto.tipo),
			idCategoria: dto.idCategoria
		})
	}
}