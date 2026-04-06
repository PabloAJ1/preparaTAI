import { fakerES } from "@faker-js/faker";
import { IGrupoPreguntasDto } from "../../../src/domains/grupoPreguntas/applications/dtos/grupoPreguntas.dto";

export const generarGrupoPreguntasDto = (props = {}): IGrupoPreguntasDto => {
	return {
		id: 'nuevo',
		textoPre: fakerES.lorem.paragraph(),
		codigo: {
			codigo: fakerES.lorem.paragraphs(),
			lenguaje: fakerES.helpers.arrayElement(['Java', 'TS', 'JS', 'Python', 'XML', 'HTML', 'C#', 'C', 'C++', 'RUBY'])
		},
		idPreguntas: [ fakerES.string.uuid(), fakerES.string.uuid(), fakerES.string.uuid(), fakerES.string.uuid() ],
		textoPos: fakerES.lorem.paragraph(),
		...props
	}
}
