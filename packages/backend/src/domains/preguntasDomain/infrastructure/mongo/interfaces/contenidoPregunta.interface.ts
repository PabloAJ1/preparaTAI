import { ICodigo } from "./codigo.interface";

export interface IContenidoPregunta {
    enunciado: string;
    codigo?: ICodigo;
    imagen?: string;
}