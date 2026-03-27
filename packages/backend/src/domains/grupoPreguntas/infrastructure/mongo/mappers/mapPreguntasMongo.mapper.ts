import { GrupoPreguntas as GrupoPreguntasEntity } from "../../../domain/entities/GrupoPreguntas";
import { CodigoVo } from "../../../domain/valueObjects/codigo.vo";
import { IGrupoPreguntasMongo } from "../interfaces/grupoPreguntas.interface";

export class MapPreguntasMongo {
	static toModel(entity: GrupoPreguntasEntity): IGrupoPreguntasMongo {
		return {
			codigo: entity.codigo,
			id: entity.idGrupoPreguntas,
			preguntas: entity.preguntas,
			textoPre: entity.textoPre,
			textoPos: entity.textoPos
		}
	}

	static toEntity(model: IGrupoPreguntasMongo): GrupoPreguntasEntity {
		return GrupoPreguntasEntity.crear({
			codigo: CodigoVo.crearConPropiedades(
				model.codigo.codigo,
				model.codigo.lenguaje
			),
			idsPreguntas: model.preguntas,
			textoPre: model.textoPre,
			textoPos: model.textoPos,
			id: model.id
		})
	}
}