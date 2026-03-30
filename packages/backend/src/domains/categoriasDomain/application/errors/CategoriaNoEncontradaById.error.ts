export class CategoriaNoEncontradaById extends Error {
	constructor(readonly idCategoria: string) {
		super(`No se ha encontrado la categoria con id: ${idCategoria}`);
		this.name = "CategoriaNoEncontradaById";
	}
}