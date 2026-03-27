import { GrupoPreguntas } from "../entities/GrupoPreguntas";
import { ELenguaje } from "../enums/lenguaje.enum";

export interface IGrupoPreguntasRepository {
	getAllGrupoPreguntas(): Promise<GrupoPreguntas[]>;
	getGrupoPreguntasById(id: string): Promise<GrupoPreguntas>;
	getGrupoPreguntasByLenguaje(lenguaje: ELenguaje): Promise<GrupoPreguntas[]>;
	createGrupoPreguntas(grupo: GrupoPreguntas): Promise<GrupoPreguntas>;
}