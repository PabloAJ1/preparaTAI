export interface ICategoriaPort {
	getIdCategoriaByName(nombreCateogira: string): Promise<string>
}