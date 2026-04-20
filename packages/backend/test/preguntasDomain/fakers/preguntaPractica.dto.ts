import { fakerES } from "@faker-js/faker"

export const generarPreguntaPracticaDto = (props = {}) => {
	return {
		enunciado: fakerES.lorem.sentence(),
		respuesta: fakerES.lorem.word(),
		...props
	}
}