export interface IPreguntasMultiple {
	categoria: {
		nombre: string;
		tipo: string;
	};
	estado: string;
	grupoPreguntas: {
		enunciado: string;
		respuestas: string[];
	}[];
}