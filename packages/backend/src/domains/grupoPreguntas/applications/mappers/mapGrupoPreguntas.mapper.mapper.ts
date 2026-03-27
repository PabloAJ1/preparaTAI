import { GrupoPreguntas } from "../../domain/entities/GrupoPreguntas";
import { CodigoVo } from "../../domain/valueObjects/codigo.vo";
import { IGrupoPreguntasDto } from "../dtos/grupoPreguntas.dto";

export class MapGrupoPreguntas {
	static toEntity(grupoPreguntas: IGrupoPreguntasDto): GrupoPreguntas{
		return GrupoPreguntas.crear({
			codigo: CodigoVo.crearConPropiedades(grupoPreguntas.codigo.codigo, grupoPreguntas.codigo.lenguaje),
			idsPreguntas: grupoPreguntas.idPreguntas,
			textoPos: grupoPreguntas.textoPos,
			textoPre: grupoPreguntas.textoPre,
			id: grupoPreguntas.id
		}) 
	}

	static toNewEntity(grupoPreguntas: IGrupoPreguntasDto): GrupoPreguntas{
		return GrupoPreguntas.crear({
			codigo: CodigoVo.crearConPropiedades(grupoPreguntas.codigo.codigo, grupoPreguntas.codigo.lenguaje),
			idsPreguntas: grupoPreguntas.idPreguntas,
			textoPos: grupoPreguntas.textoPos,
			textoPre: grupoPreguntas.textoPre,
		}) 
	}
}