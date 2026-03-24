import { test, expect, describe, vi } from 'vitest';
import { IPreguntaSQL } from '../../../../../../src/domains/preguntasDomain/infrastructure/mysql/dtos/preguntaSQL.dto';
import {AgruparPreguntas} from '../../../../../../src/domains/preguntasDomain/infrastructure/mysql/services/agruparPreguntas.service';

describe('#Test > integration > domains > preguntaCategoria > infrastructure > mysql > services > agruparPreguntas ... ', () => {
	test('deberia devolver una pregunta agrupada correctamente', async () => {
		const rows: IPreguntaSQL[] = [
			{ idPregunta: "0", enunciado: "Enunciado", respuestaCorrecta: "1", respuestaIncorrecta: "2" } as IPreguntaSQL,
			{ idPregunta: "0", enunciado: "Enunciado", respuestaCorrecta: "1", respuestaIncorrecta: "3" } as IPreguntaSQL,
			{ idPregunta: "0", enunciado: "Enunciado", respuestaCorrecta: "1", respuestaIncorrecta: "4" } as IPreguntaSQL,
			{ idPregunta: "0", enunciado: "Enunciado", respuestaCorrecta: "1", respuestaIncorrecta: "5" } as IPreguntaSQL,
		];

		const result = AgruparPreguntas.agrupar(rows);

		expect(result.length).toBe(1);
		expect(result[0]).toHaveProperty("enunciado")
		expect(result[0]).toHaveProperty("respuestas")
		expect(result[0].enunciado).toBe("Enunciado")
		expect(result[0].respuestas.length).toBe(5);
		result[0].respuestas.forEach(r => {
			expect(r).toHaveProperty("enunciado");
			expect(r).toHaveProperty("correcta");
		})

		expect(result[0].respuestas.find(r => r.correcta)?.correcta).toBeTruthy();
		expect(result[0].respuestas.find(r => !r.correcta)?.correcta).toBeFalsy();
	});
})