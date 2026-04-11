export interface IInicializarCategorias {
	exec(options?: { clearDB: boolean, path: string }): Promise<void>
}