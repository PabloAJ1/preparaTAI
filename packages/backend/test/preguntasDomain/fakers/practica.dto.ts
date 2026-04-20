import { fakerES } from "@faker-js/faker";
import { IPracticaCreateDto } from "../../../src/domains/preguntasDomain/application/dtos/practicaCreate.dto";
import { generarEstadoEnum } from "./estado.enum";
import { generarPreguntaPracticaDto } from "./preguntaPractica.dto";

export const generarPracticaDto = (props = {}): IPracticaCreateDto => {
	return {
		estado: generarEstadoEnum(),
		nombrePractica: fakerES.lorem.word(),
		pregunta: generarArrayPreguntas(),
		...props
	}
}

export const generarArrayPreguntas = (min = 4, max = 10) => {
	const array = [];
	const randomPreguntas = fakerES.number.int({max: max, min: min});

	for(let x = 0; x < randomPreguntas; x++){
		array.push(generarPreguntaPracticaDto());
	}

	return array;
}