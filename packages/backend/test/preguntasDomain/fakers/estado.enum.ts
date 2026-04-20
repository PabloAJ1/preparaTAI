import { fakerES } from "@faker-js/faker"

export const generarEstadoEnum = () => {
	return fakerES.helpers.arrayElement([
		"GPT",
		"Revisado",
		"Verificado",
		"Enterrado",
		"Desenterrado",
		"Marcado para revisar"
	])
}