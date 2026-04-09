import { IContenidoPreguntaDto } from "../../../application/dtos/contenidoPregunta.dto";
import { IDetectarCodigoEnEnunciadoService } from "../../../application/ports/detectarCodigoEnunciado.interface";
import { IDetectorLenguajeCodigo } from "../interfaces/detectorCodigo.interface";
import { IFormateadorCodigo } from "../interfaces/parsearCodigo.interface";

export class DetectorLenguajeCodigo implements IDetectarCodigoEnEnunciadoService {
	readonly #regex = /<code>([\s\S]*?)<\/code>/

	constructor(
		private readonly detectorLenguajeCodigo: IDetectorLenguajeCodigo,
		private readonly parsearCodigo: IFormateadorCodigo
	){}
	
	async exec(enunciado: string): Promise<IContenidoPreguntaDto> {
		const codigo = this.#detectarCodigo(enunciado);

		if(codigo){
			const lenguaje = this.detectorLenguajeCodigo.detectar(codigo);		
			return {
				enunciado: this.#textoNoCodido(enunciado),
				codigo: {
					codigo: await this.parsearCodigo.formatear(codigo, lenguaje ?? "Otro"),
					lenguaje: lenguaje ?? 'Otros'
				}
			}
		} else {
			return {
				enunciado: enunciado
			}
		}		
	}

	#detectarCodigo(enunciado: string): string | undefined {
		const partes = enunciado.split(this.#regex);
		return partes[1]?.trim() || undefined;
	}

	#textoNoCodido(enunciado: string): string{
		const partes = enunciado.split(this.#regex);
		return partes[0].trim() + "\n" + partes[2].trim();
	}
	
}