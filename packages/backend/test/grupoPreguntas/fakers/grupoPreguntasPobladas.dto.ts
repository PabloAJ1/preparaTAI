import { IGrupoPreguntasPobladaDto } from "../../../src/domains/grupoPreguntas/applications/dtos/grupoPreguntasPoblada.dto";
import { generarGrupoPreguntasDto } from "./grupoPreguntas.dto";
import { generarPreguntaDto } from "../../preguntasDomain/fakers/pregunta.dto";
import { IPreguntaDto } from "../../../src/domains/grupoPreguntas/applications/dtos/pregunta.dto";

export const generarGrupoPreguntasPobladasDto = (numPreguntas = 4, props = {}): IGrupoPreguntasPobladaDto => {
	const preguntaSinPoblar = generarGrupoPreguntasDto();
	const respuestas: IPreguntaDto[] = [];

	for(let i = 0; i <= numPreguntas; i++){
		respuestas.push(generarPreguntaDto());
	}

	return {
		...preguntaSinPoblar,
		preguntas: respuestas,
		...props
	}

}
