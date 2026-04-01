import { ICategoriasPort } from "../../../application/ports/categoriasPort.interface";
import { IInicializarCategorias } from "../signatures/inicializarCategorias.interface";

export class CategoriaPortService implements ICategoriasPort {
	constructor(
		private readonly inicializarCategorias: IInicializarCategorias
	){}

	async inicializarDB(): Promise<void> {
		await this.inicializarCategorias.exec({ clearDB: true })
	}

}