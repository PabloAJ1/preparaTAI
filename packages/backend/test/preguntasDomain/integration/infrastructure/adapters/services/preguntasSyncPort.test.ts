import { describe, it, expect } from 'vitest';
import { PreguntasSyncPort } from '../../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/preguntasSyncPort.service';
import { PreguntasExternalAtlasService } from '../../../../../../src/domains/preguntasDomain/infrastructure/atlas/services/PreguntasExternalAtlas.service';

/**
 * Esto deberia ser mockeado y seguramente en ese caso lo convertiriamos en una prueba unitaria
 */
describe('#Test > integration > infrastructure > adapters > ports > PreguntasSyncPort ... ', () => {
	it('debería llamar a la bd externa y leer los datos', async () => {
		const getPreguntasFromAtlas = new PreguntasExternalAtlasService();
		const portPreguntasSync = new PreguntasSyncPort(getPreguntasFromAtlas)

		const preguntas = await portPreguntasSync.readAllPreguntas();
		
		expect(preguntas.length).greaterThan(0)
	});
});
