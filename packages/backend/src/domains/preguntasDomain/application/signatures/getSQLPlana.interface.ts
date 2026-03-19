export interface IGetSQLPlana {
	exec(path: string): Promise<string[]>;
}
