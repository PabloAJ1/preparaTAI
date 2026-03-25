export interface IRegistarEstadisticaByPregunta {
	exec(idPregunta: string, acierto: boolean): Promise<void>;
}