import hljs from 'highlight.js';
import { IDetectorLenguajeCodigo } from '../../../../domains/preguntasDomain/infrastructure/adapters/interfaces/detectorCodigo.interface';

export class DetectorLenguajeHighlight implements IDetectorLenguajeCodigo {
	detectar(codigo: string): string | null {
		const result = hljs.highlightAuto(codigo);
		return result.language ?? null;
	}
}