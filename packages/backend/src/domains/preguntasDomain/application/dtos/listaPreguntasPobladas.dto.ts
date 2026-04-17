import { IPreguntaPobladaDto } from "./preguntaPoblada.dto";

export interface IListaPreguntasPobladasDto {
	idCategoriaPrincipal: string;
	nombreCategoriaPrincipal: string;
	listaPreguntas: IPreguntaPobladaDto[]
}