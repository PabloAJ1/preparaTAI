import { test, expect, describe, vi } from 'vitest';
import { GenerarPreguntasABService } from '../../../../../src/domains/preguntasDomain/application/services/GenerarPreguntasAB.service';
import { IPreguntasAB } from '../../../../../src/domains/preguntasDomain/application/dtos/preguntasAB.dto';
import { CategoriaAdaperServive } from '../../../../../src/domains/preguntasDomain/infrastructure/adapters/ports/categoriasAdapter.service';
import { CategoriaRepositoryMongo } from '../../../../../src/domains/categoriasDomain/infrastructure/mongo/repositories/categoriaRepositoryMongo.repository';
import { BuscarOCrearCategoria } from '../../../../../src/domains/categoriasDomain/application/useCases/buscarOCrearCategoria';

describe('#Test > integration > domains > preguntasDomain > application > usesCases > generarPreguntasAB ... ', () => {
	const categoriaMongoDBRepository = new CategoriaRepositoryMongo()

	const getAllCategoriasPort = { exec: vi.fn(), };
	const crateListOfCategorias = { exec: vi.fn(), };
	const getListOfCategorias = { exec: vi.fn(), };
	const getBuscarOCrearCategoriaPorNombre = new BuscarOCrearCategoria(categoriaMongoDBRepository)

	const categoriaAdapertService = new CategoriaAdaperServive(
		getAllCategoriasPort,
		crateListOfCategorias,
		getListOfCategorias,
		getBuscarOCrearCategoriaPorNombre
	)

	const generarPreguntaABUseCase = new GenerarPreguntasABService(
		categoriaAdapertService
	);

	test('deberia generar las preguntas', async () => {
		const preguntasAB: IPreguntasAB = {
			categoria: {
				nombre: "Ley 39/2015",
				tipo: "PRACTICA"
			},
			estado: "Revisado",
			enunciadoA: "¿Cuál de los siguientes será un acto nulo de pleno derecho?",
			enunciadoB: "¿Cual de los siguientes será un acto anulable?",
			respuestasA: [
				"Los que lesionen los derechos y libertades susceptibles de amparo constitucional.",
				"Los dictados por órgano manifiestamente incompetente por razón de la materia o del territorio.",
				"Los que tengan un contenido imposible.",
				"Los que sean constitutivos de infracción penal o se dicten como consecuencia de ésta.",
				"Los dictados prescindiendo total y absolutamente del procedimiento legalmente establecido o de las normas que contienen las reglas esenciales para la formación de la voluntad de los órganos colegiados.",
				"Los actos expresos o presuntos contrarios al ordenamiento jurídico por los que se adquieren facultades o derechos cuando se carezca de los requisitos esenciales para su adquisición.",
				"Cualquier otro que se establezca expresamente en una disposición con rango de Ley.",
				"Las disposiciones administrativas que vulneren la Constitución, las leyes u otras disposiciones administrativas de rango superior, las que regulen materias reservadas a la Ley, y las que establezcan la retroactividad de disposiciones sancionadoras no favorables o restrictivas de derechos individuales.",
			],
			respuestasB: [
				"Actos de la Administración que incurran en cualquier infracción del ordenamiento jurídico, incluso la desviación de poder",
				"Cuando el acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a la indefensión de los interesados",
				"La realización de actuaciones administrativas fuera del tiempo establecido para ellas cuando así lo imponga la naturaleza del término o plazo",
			]
		}

		const preguntasGeneradas = await generarPreguntaABUseCase.generar(preguntasAB);
		
		expect(preguntasGeneradas.length).toBe(11);
		preguntasGeneradas.forEach(p => {
			expect(p).toHaveProperty("categorias")
			if(p.enunciado.enunciado === preguntasAB.enunciadoA){
				expect(p.respuestas.length).toBe(4)
				expect(p.respuestas.reduce((acc, r) => acc += r.isCorrect ? 1 : 0, 0)).toBe(1)
				expect(p.respuestas.reduce((acc, r) => acc += !r.isCorrect ? 1 : 0, 0)).toBe(3)
			} 
			else if(p.enunciado.enunciado === preguntasAB.enunciadoB){
				expect(p.respuestas.length).toBe(9)
				expect(p.respuestas.reduce((acc, r) => acc += r.isCorrect ? 1 : 0, 0)).toBe(1)
				expect(p.respuestas.reduce((acc, r) => acc += !r.isCorrect ? 1 : 0, 0)).toBe(8)
			}			
		})
	});

});
