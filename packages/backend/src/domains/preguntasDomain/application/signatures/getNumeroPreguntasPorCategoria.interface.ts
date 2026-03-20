export interface IGetNumeroPreguntasPorCategoria {
	exec(nombreCategoria: string): Promise<number>;
}