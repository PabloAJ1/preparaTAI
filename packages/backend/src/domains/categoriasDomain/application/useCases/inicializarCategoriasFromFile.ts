import { IGestionBDRepository } from "../interfaces/gestionBDRepository.interface";
import { IInicializarCategorias } from "../signatures/inicializarCategorias.interface";

export class InicializarCategoriasFromFile implements IInicializarCategorias {
	constructor(
		private readonly getionDBService: IGestionBDRepository,
	){}

	async exec(options: { clearDB: boolean, path: string  } = { clearDB: false, path: "" }): Promise<void> {
		if(options.clearDB){
			await this.getionDBService.limpiarDB()
		}
			
		await this.getionDBService.restore()
	}
}