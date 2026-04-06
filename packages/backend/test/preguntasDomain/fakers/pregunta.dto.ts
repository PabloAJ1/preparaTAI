import { IPreguntaDto } from "../../../src/domains/preguntasDomain/application/dtos/pregunta.dto";
import { fakerES } from "@faker-js/faker"

export const generarPreguntaDto = (props = {}): IPreguntaDto => {
	return {
		id: fakerES.string.uuid(),
		enunciado: fakerES.lorem.sentence(),
		respuestas: [{
			enunciado: fakerES.lorem.sentence(),
			correcta: true
		},{
			enunciado: fakerES.lorem.sentence(),
			correcta: false,
		},{
			enunciado: fakerES.lorem.sentence(),
			correcta: false,
		},{
			enunciado: fakerES.lorem.sentence(),
			correcta: false,
		}],
		categorias: [fakerES.string.uuid(), fakerES.string.uuid(), fakerES.string.uuid()],
		estadisticas: {
			aciertos: 0,
			fallos: 0,
			total: 0,
		},
		descartada: false,
		estado: fakerES.helpers.arrayElement(["Verficada", "Revisada", "GPT"]),
		...props
	}
}