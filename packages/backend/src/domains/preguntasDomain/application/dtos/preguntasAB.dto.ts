export interface IPreguntasAB {
	enunciadoA: string;
	enunciadoB: string;
	categoria: {
		nombre: string;
		tipo: string;
	};
	estado: string;
	respuestasA: string[];
	respuestasB: string[];
}