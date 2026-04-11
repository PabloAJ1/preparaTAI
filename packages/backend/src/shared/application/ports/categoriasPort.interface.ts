export interface ICategoriasPort {
	inicializarDB(options?: { clearDB: boolean, path: string }): Promise<void>
}