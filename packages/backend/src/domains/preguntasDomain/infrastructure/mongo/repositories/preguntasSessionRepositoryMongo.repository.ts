import { PreguntasSessionNoEncontradaBySeed } from "../../../application/errors/PreguntasSessionNoEncontradaById.error";
import { PreguntaSession } from "../../../domain/entities/PreguntasSession";
import { IPreguntaSessionRepository } from "../../../domain/repositories/preguntasSessionRepository.interface";
import { IPreguntasSession } from "../interfaces/preguntasSession.interface";
import PreguntasSessionModel from "../schemas/preguntasSession.schema";

export class PreguntasSessionRepositoryMongo implements IPreguntaSessionRepository {
    async crearPreguntasSesion(preguntasSesion: PreguntaSession): Promise<PreguntaSession> {
        const preDoc = this.#toModel(preguntasSesion);
        const doc = await PreguntasSessionModel.create(preDoc);
        
        return this.#toEntity(doc);
    }

    async cargarPreguntaSesionPorSeed(seed: number): Promise<PreguntaSession> {
        const doc = await PreguntasSessionModel.findOne(
			{ seed: seed },
		);

        if(!doc) throw new PreguntasSessionNoEncontradaBySeed(seed);

        return this.#toEntity(doc);
    }

    #toEntity(doc: IPreguntasSession): PreguntaSession {
        return PreguntaSession.crear({
            createdAt: doc.createAt,
            listaPreguntasId: doc.listaPreguntasId,
            seed: doc.seed,
            id: doc.id
        });
    }

    #toModel(entity: PreguntaSession): IPreguntasSession {
        return {
            createAt: entity.createdAt,
            id: entity.id,
            listaPreguntasId: entity.listaPreguntasId,
            seed: entity.seed
        };
    }
}