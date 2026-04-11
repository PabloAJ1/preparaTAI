import { TPreguntasSession } from "../types/preguntasSession.type";
import { v7 as uuid } from "uuid"

export class PreguntaSession {
    #props: TPreguntasSession

    private constructor(props: TPreguntasSession){
        this.#props = props;
    }

    obtenerPagina(
        pagina: number,
        limite: number
    ){
        const start = (pagina - 1) * limite;
        return this.#props.listaPreguntasId.slice(start, start + limite)
    }

    static crear(props: Omit<TPreguntasSession, 'id'> & Partial<Pick<TPreguntasSession, 'id'>>){
        return new PreguntaSession({
            ...props,
            id: props.id ?? uuid(),
        })
    }
}