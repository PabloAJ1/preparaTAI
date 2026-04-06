import { test, expect, describe } from 'vitest';
import { generarGrupoPreguntasDto } from '../../../fakers/grupoPreguntas.dto';
import { CreateGrupoPreguntas } from '../../../../../src/domains/grupoPreguntas/applications/useCases/createGrupoPreguntas';
import { GrupoPreguntasRepositoryMongo } from '../../../../../src/domains/grupoPreguntas/infrastructure/mongo/repositories/grupoPreguntasRepositoryMongo.repository';

describe('#Test > integration > domains > categoriaDomain > application > usesCases > getCategoriaResumen ... ', () => {
	const grupoPreguntasMongoRepository = new GrupoPreguntasRepositoryMongo();
	const generarGrupoPreguntasUseCase = new CreateGrupoPreguntas(grupoPreguntasMongoRepository);

	test('deberia devolver un resultado correcto con repos mockeados', async () => {
		const generarDto = generarGrupoPreguntasDto();
		const result = await generarGrupoPreguntasUseCase.exec(generarDto);

		expect(result).toHaveProperty("id")
		expect(result).toHaveProperty("textoPre")
		expect(result).toHaveProperty("textoPos")
		expect(result).toHaveProperty("codigo")
		expect(result).toHaveProperty("idPreguntas")
		expect(result.codigo).toHaveProperty("codigo")
		expect(result.codigo).toHaveProperty("lenguaje")

		expect(result.id).not.toBe("nuevo")
		expect(result.textoPre).toBe(generarDto.textoPre)
		expect(result.textoPos).toBe(generarDto.textoPos)
		expect(result.codigo.codigo).toBe(generarDto.codigo.codigo)
		expect(result.codigo.lenguaje).toBe(generarDto.codigo.lenguaje)
		expect(result.idPreguntas[0]).toBe(generarDto.idPreguntas[0])
	});
});