import { ICategoriasPort } from "../ports/categoriasPort.interface";
import { IPreguntasPort } from "../ports/preguntasPort.interface";
import { IInicializarDB } from "../signatures/inicializarDB.interface";

export class InicializarDB implements IInicializarDB {
	constructor(
		private readonly preguntasPort: IPreguntasPort,
		private readonly categoriasPort: ICategoriasPort
	){}

	async exec(): Promise<void> {
		await this.categoriasPort.inicializarDB({ clearDB: true, path: "" });
		await this.preguntasPort.inicializarDB({ clearDB: true, path: "" });
	}
}