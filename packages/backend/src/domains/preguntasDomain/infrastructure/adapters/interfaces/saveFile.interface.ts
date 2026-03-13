export interface ISaveFile {
	saveFile(listaSQL: string[]): Promise<void>;
}