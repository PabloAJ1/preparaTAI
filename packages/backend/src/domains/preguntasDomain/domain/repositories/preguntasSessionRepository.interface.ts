import { PreguntaSession } from "../entities/PreguntasSession";

export interface IPreguntaSessionRepository {
    crearPreguntasSesion(preguntasSesion: PreguntaSession): Promise<PreguntaSession>;
    cargarPreguntaSesionPorSeed(seed: number): Promise<PreguntaSession | undefined>;
}