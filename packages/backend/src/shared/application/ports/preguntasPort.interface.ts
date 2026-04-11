export interface IPreguntasPort {
	inicializarDB(options?: { clearDB: boolean, path: string }): Promise<void>
}