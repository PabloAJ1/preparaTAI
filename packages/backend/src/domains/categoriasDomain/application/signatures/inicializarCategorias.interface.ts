export interface IInicializarCategorias {
	exec(options?: { clearDB: boolean  }): Promise<void>
}