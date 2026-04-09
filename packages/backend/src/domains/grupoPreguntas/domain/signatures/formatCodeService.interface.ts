export interface IFormateadorCodigo {
	formatear(codigo: string, lenguaje: string): Promise<string>
}