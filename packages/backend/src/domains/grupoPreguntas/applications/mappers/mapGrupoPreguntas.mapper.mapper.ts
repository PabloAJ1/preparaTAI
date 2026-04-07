import { GrupoPreguntas } from "../../domain/entities/GrupoPreguntas";
import { CodigoVo } from "../../domain/valueObjects/codigo.vo";
import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";

export class MapGrupoPreguntas {
	static async toEntity(grupoPreguntas: IGrupoPreguntasDto): Promise<GrupoPreguntas> {
		return GrupoPreguntas.crear({
			codigo: await CodigoVo.crearConPropiedades(grupoPreguntas.codigo.codigo, grupoPreguntas.codigo.lenguaje),
			idsPreguntas: grupoPreguntas.idPreguntas,
			textoPos: grupoPreguntas.textoPos,
			textoPre: grupoPreguntas.textoPre,
			id: grupoPreguntas.id,
			idCategoriaGrupoPregunta: grupoPreguntas.idGrupoPregunta,
		}) 
	}

	static async toNewEntity(grupoPreguntas: IGrupoPreguntasDto): Promise<GrupoPreguntas>{
		return GrupoPreguntas.crear({
			codigo: await CodigoVo.crearConPropiedades(grupoPreguntas.codigo.codigo, grupoPreguntas.codigo.lenguaje),
			idsPreguntas: grupoPreguntas.idPreguntas,
			textoPos: grupoPreguntas.textoPos,
			textoPre: grupoPreguntas.textoPre,
			idCategoriaGrupoPregunta: grupoPreguntas.idGrupoPregunta,
		}) 
	}

	static toDto(entity: GrupoPreguntas): IGrupoPreguntasDto {
		return {
			codigo: {
				codigo: entity.codigo.codigo,
				lenguaje: entity.codigo.lenguaje
			},
			id: entity.idGrupoPreguntas,
			textoPos: entity.textoPos,
			textoPre: entity.textoPre,
			idPreguntas: entity.preguntas,
			idGrupoPregunta: entity.idCategoriaGrupoPregunta,
		}
	}
}