export interface IInicializarPreguntas {
	exec(options?: { clearDB: boolean, path: string }): Promise<void>
}