import { IPregunta } from "../interfaces/pregunta.interface";

/**
 * 
 * @param array Array completo de Preguntas
 * @param size Tamaño de fragmento que queremos para cargar por bloque
 * @returns Devuelve una matriz de preguntas que será procesada
 * 
 * Funcion para dividir el array de preguntas en una matriz, asi la carga de las preguntas se hará en bloques
 * Esto esta pensado para la carga inicial de preguntas
 */
export const chunkArrayService = (array: IPregunta[], size = 1000): IPregunta[][] => {
	const result: IPregunta[][] = [];

	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}

	return result;
}