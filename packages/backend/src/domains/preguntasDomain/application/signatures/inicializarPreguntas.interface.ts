export interface IInicializarPreguntas {
	exec(options?: { clearDB: boolean  }): Promise<void>
}