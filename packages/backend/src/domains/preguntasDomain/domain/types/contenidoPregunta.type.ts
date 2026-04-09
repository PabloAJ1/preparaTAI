import { CodigoVo } from "../../../../shared/domains/valueObjects/codigo.vo";

export type TContenidoPregunta = {
    enunciado: string;
	codigo?: CodigoVo;
	imagen?: string;
}