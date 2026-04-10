export interface IPreguntasAtlasDto {
    idPregunta: string
    enunciado: string
    descartada: boolean,
    respuestas: {
		enunciado: string;
		id: string;
		correcta: boolean;
	}[],
    estadisticas: { aciertos: number, fallos: number, total: number },
    categorias: string[],
    randomKey: number
    estado: string
    __v: 0
}