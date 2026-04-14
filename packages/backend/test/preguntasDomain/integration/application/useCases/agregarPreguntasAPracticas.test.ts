import { test, expect, describe, beforeAll } from 'vitest';
import { PreguntaRespositoryMongoDB } from '../../../../../src/domains/preguntasDomain/infrastructure/mongo/repositories/preguntaRespositoryMongoDB.repository';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { CreateListOfCategorias } from '../../../../../src/domains/categoriasDomain/application/useCases/createListOfCategorias';
import { CrearPregunta } from '../../../../../src/domains/preguntasDomain/application/useCases/createPregunta';
import { GetPreguntasPorCateogira } from '../../../../../src/domains/preguntasDomain/application/useCases/getPreguntasPorCateogira';
import { AgregarPreguntasAPracticas } from '../../../../../src/domains/preguntasDomain/application/useCases/AgregarPreguntasAPracticas';
import { generarPreguntaDto } from '../../../fakers/pregunta.dto';
import { ICategoriaDto } from '../../../../../src/domains/categoriasDomain/application/dtos/categoria.dto';

describe('#Test > integration > domains > preguntasDomain > application > usesCases > agregarPreguntasAPracticas ... ', () => {
	//Variables
	let categoria: ICategoriaDto;

	//Repos
	const preguntasRepositoryMongoDB = new PreguntaRespositoryMongoDB();
	const categoriaRepositoryMondoDB = new CategoriaRepositoryMongo();

	//Use Cases
	const crearCategoriaUseCase = new CreateListOfCategorias(categoriaRepositoryMondoDB);
	const crearPreguntasUseCase = new CrearPregunta(preguntasRepositoryMongoDB);
	const agregarPreguntasAPracticas = new AgregarPreguntasAPracticas(preguntasRepositoryMongoDB)
	const getPreguntasPorCategoria = new GetPreguntasPorCateogira(preguntasRepositoryMongoDB)

	beforeAll(async () => {
		categoria = (await crearCategoriaUseCase.exec([{ nombreCategoria: 'TEST_ADD_MAS_PREGUNTAS', tipo: "PRACTICA", idCategoria: 'nuevo'}]))[0];

		const preguntas = [
			generarPreguntaDto({
				categorias: [categoria.idCategoria],
				respuestas: [{
					enunciado: "Enunciado 1",
					correcta: true,
					id: '1'
				},{
					enunciado: "Enunciado 2",
					correcta: false,
					id: '2'
				},{
					enunciado: "Enunciado 3",
					correcta: false,
					id: '3'
				}]
			}),
			generarPreguntaDto({
				categorias: [categoria.idCategoria],
				respuestas: [{
					enunciado: "Enunciado 1",
					correcta: true,
					id: '2'
				},{
					enunciado: "Enunciado 1",
					correcta: false,
					id: '1'
				},{
					enunciado: "Enunciado 3",
					correcta: false,
					id: '3'
				}]
			}),
			generarPreguntaDto({
				categorias: [categoria.idCategoria],
				respuestas: [{
					enunciado: "Enunciado 3",
					correcta: true,
					id: '3'
				},{
					enunciado: "Enunciado 2",
					correcta: false,
					id: '2'
				},{
					enunciado: "Enunciado 1",
					correcta: false,
					id: '1'
				}]
			})
		]

		for(const p of preguntas){
			await crearPreguntasUseCase.exec(p)
		}	
	})

	test('deberia crear la nueva pregunta y actualizar todas las demás', async () => {
		const nuevaPregunta = generarPreguntaDto({
				categorias: [categoria.idCategoria],
				respuestas: [{
					enunciado: "Enunciado 4",
					correcta: true,
					id: '1'
				}]
			})
		await agregarPreguntasAPracticas.exec([nuevaPregunta], categoria.idCategoria);

		const preguntasEnBD = await getPreguntasPorCategoria.exec(categoria.idCategoria);

		expect(preguntasEnBD.length).toBe(4);

		preguntasEnBD.forEach(p => {
			expect(p.categorias[0]).toBe(categoria.idCategoria);
			expect(p.respuestas.length).toBe(4);;
		})
	});
})