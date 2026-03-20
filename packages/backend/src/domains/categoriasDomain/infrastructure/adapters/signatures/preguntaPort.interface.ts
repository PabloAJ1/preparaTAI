export interface IGetNumeroPreguntasPorCategoriaPort {
	exec(nombreCategoria: string): Promise<number>;
}