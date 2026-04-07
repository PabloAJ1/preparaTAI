
import { IGrupoPreguntasPobladaDto } from '../../../applications/dtos/grupoPreguntasPoblada.dto';
import { ILoadPreguntasFromFilePort } from '../../../applications/interfaces/loadPreguntasFromFilePort.interface';
import { IPreguntaDto } from '../dtos/pregunta.dto';
import { IExcelLoader } from '../interfaces/excelLoader.interface';


export class ExcelAdapterService implements ILoadPreguntasFromFilePort {
	constructor(
		private readonly excelLoader: IExcelLoader,
		private readonly outputPath: string,
	) {}
	async loadFile(): Promise<IGrupoPreguntasPobladaDto[]> {
		const excelData = await this.excelLoader.cargarDatosFichero(this.outputPath);

		const gruposMap = new Map<string, IGrupoPreguntasPobladaDto>();

		for(const linea of excelData){
			// Si no existe el grupo, lo creamos
			if (!gruposMap.has(linea.id)) {
				gruposMap.set(linea.id, {
					idGrupoPregunta: linea.examen,
					textoPre: linea.Pre,
					textoPos: linea.Pos,
					codigo: {
						codigo: linea.Code,
						lenguaje: linea.lenguaje,
					},
					preguntas: [],
					id: 'nuevo',
				});
			}

			// Creamos la pregunta a partir de la fila
			const pregunta: IPreguntaDto = {
				categorias: [linea.examen],
				respuestas: [{
					enunciado: linea.respuesta1,
					correcta: linea.correcta === "a"
				},{
					enunciado: linea.respuesta2,
					correcta: linea.correcta === "a"
				},{
					enunciado: linea.respuesta3,
					correcta: linea.correcta === "a"
				},{
					enunciado: linea.respuesta4,
					correcta: linea.correcta === "a"
				}],
				enunciado: linea.Pregunta,
				estadisticas: { aciertos: 0, fallos: 0, total: 0},
				id: "nuevo"
			};

			// Añadimos la pregunta al grupo
        	gruposMap.get(linea.id)?.preguntas.push(pregunta);

		}
		
		return Array.from(gruposMap.values());
	}
}
