import { GrupoPreguntas as GrupoPreguntasEntity } from "../../../domain/entities/GrupoPreguntas";
import { CodigoVo } from "../../../domain/valueObjects/codigo.vo";
import { IGrupoPreguntasMongo } from "../interfaces/grupoPreguntas.interface";

export class MapPreguntasMongo {
	static toModel(entity: GrupoPreguntasEntity): IGrupoPreguntasMongo {
		return {
			codigo: {
				codigo: entity.codigo.codigo,
				lenguaje: entity.codigo.lenguaje
			},
			id: entity.idGrupoPreguntas,
			preguntas: entity.preguntas,
			textoPre: entity.textoPre,
			textoPos: entity.textoPos,
			idGrupoPregunta: entity.idCategoriaGrupoPregunta
		}
	}

	static async toEntity(model: IGrupoPreguntasMongo): Promise<GrupoPreguntasEntity> {
		return GrupoPreguntasEntity.crear({
			codigo: await CodigoVo.crearConPropiedades(
				model.codigo.codigo,
				model.codigo.lenguaje
			),
			idsPreguntas: model.preguntas,
			textoPre: model.textoPre,
			textoPos: model.textoPos,
			id: model.id,
			idCategoriaGrupoPregunta: model.idGrupoPregunta
		})
	}
}