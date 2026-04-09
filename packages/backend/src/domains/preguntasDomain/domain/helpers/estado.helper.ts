import { EEstado } from "../enums/estado.enum";

export class EstadoHelper {
	static fromString(value: string): EEstado {
		if(!value) return EEstado.REVISADO
		
		const key = value.toUpperCase() as keyof typeof EEstado;

		if (!EEstado[key]) {
			//throw new Error(`Estado inválido: ${value}`);
			//De momento este por defecto y que no falle
			return EEstado.MARCADO
		}

		return EEstado[key];
	}
}