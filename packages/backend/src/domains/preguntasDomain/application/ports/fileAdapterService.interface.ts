export interface IFileSaveService {
  	save(strings: string[]): Promise<void>;
}