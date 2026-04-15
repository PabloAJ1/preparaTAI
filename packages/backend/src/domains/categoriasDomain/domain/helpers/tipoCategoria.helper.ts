import { ETipoCategoria } from "../enums/tipoCategoria.enum";

export class TipoCategortiaHelper {
	static fromString(value: string): ETipoCategoria {
		const key = value.toUpperCase() as keyof typeof ETipoCategoria;

		if (!ETipoCategoria[key]) return ETipoCategoria.DEFAULT

		return ETipoCategoria[key];
	}
}