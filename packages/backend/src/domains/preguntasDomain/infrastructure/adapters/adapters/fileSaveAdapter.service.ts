import { IFileSaveService } from '../../../application/ports/fileAdapterService.interface';
import { ISaveFile } from '../interfaces/saveFile.interface';

export class FileSaveAdapter implements IFileSaveService {
	constructor(private readonly saveFile: ISaveFile) {}

	async save(strings: string[]): Promise<void> {
		await this.saveFile.saveFile(strings);
	}
}
