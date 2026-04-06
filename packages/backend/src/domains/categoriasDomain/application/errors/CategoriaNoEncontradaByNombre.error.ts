export class CategoriaNoEncontradaByNombre extends Error {
	constructor(readonly nombreCategoria: string) {
		super(`No se ha encontrado la categoria con nombre: ${nombreCategoria}`);
		this.name = "CategoriaNoEncontradaByNombre";
	}
}