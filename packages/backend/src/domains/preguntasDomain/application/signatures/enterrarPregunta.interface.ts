export interface IEnterrarPregunta {
	exec(idPregunta: string): Promise<void>
}