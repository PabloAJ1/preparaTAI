import { IPreguntaDto } from "../../../src/domains/preguntasDomain/application/dtos/pregunta.dto";
import { fakerES } from "@faker-js/faker"

export const generarPreguntaDto = (props = {}): IPreguntaDto => {
	return {
		id: fakerES.string.uuid(),
		enunciado: fakerES.lorem.sentence(),
		respuestas: [{
			enunciado: fakerES.lorem.sentence(),
			correcta: true,
			id: fakerES.string.uuid(),
		},{
			enunciado: fakerES.lorem.sentence(),
			correcta: false,
			id: fakerES.string.uuid(),
		},{
			enunciado: fakerES.lorem.sentence(),
			correcta: false,
			id: fakerES.string.uuid(),
		},{
			enunciado: fakerES.lorem.sentence(),
			correcta: false,
			id: fakerES.string.uuid(),
		}],
		categorias: [fakerES.string.uuid(), fakerES.string.uuid(), fakerES.string.uuid()],
		estadisticas: {
			aciertos: 0,
			fallos: 0,
			total: 0,
		},
		estado: fakerES.helpers.arrayElement(["Verficada", "Revisada", "GPT"]),
		...props
	}
}