export interface IEstadisticasPorCategoria {
    exec(idCategoria: string): Promise<{numeroPreguntas: number, aciertos: number, fallos: number}>
}