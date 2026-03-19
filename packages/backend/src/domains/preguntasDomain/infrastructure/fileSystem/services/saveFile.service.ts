import { writeFile } from 'node:fs/promises';
import { ISaveFile } from '../../adapters/interfaces/saveFile.interface';

export class SaveFile implements ISaveFile {
	constructor(private readonly filePath: string) {}

	async saveFile(listaSQL: string[]): Promise<void> {
		console.log(this.filePath);
		console.log('Holi');
		const content = listaSQL.join(';\n');
		await writeFile(this.filePath, content);
	}
}
