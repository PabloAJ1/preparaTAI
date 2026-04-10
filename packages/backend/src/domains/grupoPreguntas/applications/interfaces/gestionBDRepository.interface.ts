export interface IGestionBDRepository {
	restore(pathFix? : string): Promise<void>
	backup(pathFix? : string): Promise<void>
	limpiarDB(): Promise<void>
}