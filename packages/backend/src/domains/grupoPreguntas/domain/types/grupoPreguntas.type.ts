import { CodigoVo } from "../valueObjects/codigo.vo";

export type TGrupoPreguntas = {
	id: string;
	textoPre: string;
	textoPos: string;
	codigo: CodigoVo;
	idsPreguntas: string[]
}