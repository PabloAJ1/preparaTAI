export interface IMigrationDB {
	exec(): Promise<void>
}