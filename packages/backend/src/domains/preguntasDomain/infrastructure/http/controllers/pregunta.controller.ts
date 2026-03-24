import { Request, Response, NextFunction } from 'express';
import { IGetNumeroPreguntas } from '../../../application/signatures/getNumeroPreguntas.interface';
import { preguntasBuilder } from '../../../preguntasBuilder';
import { components } from '../../../../../types/openapi';
import { MapPreguntaController } from '../mappers/mapPreguntasController.mapper';
import { IGetPreguntasPorCateogiraConPaginacion } from '../../../application/signatures/getPreguntasPorCateogiraConPaginacion.interface';

type TPreguntas = components['schemas']['Pregunta'];

const { getNumeroPreguntas, getPreguntasPorCategoriaPaginando } = preguntasBuilder();

export const makeHandleGetNumeroPreguntas =
	(getNumeroPreguntas: IGetNumeroPreguntas) =>
	async (_req: Request, res: Response<number>, next: NextFunction) => {
		try {
			const numeroPreguntas = await getNumeroPreguntas.exec();
			res.json(numeroPreguntas);
		} catch (err) {
			next(err);
		}
	};

export const makeHandleGetPreguntasPorCategoria =
	(getPreguntasPorCategoria: IGetPreguntasPorCateogiraConPaginacion) =>
	async (req: Request, res: Response<TPreguntas[]>, next: NextFunction) => {
		try {
			const categoria = decodeURIComponent(req.params.categoria);
			const page = parseInt(req.query.page as string) || 1;
      		const limit = parseInt(req.query.limit as string) || 20;
			const preguntas = await getPreguntasPorCategoria.exec(categoria, page, limit);

			res.json(preguntas.map(MapPreguntaController.toType));
		} catch (err) {
			next(err);
		}
	};

export const handleGetNumeroPreguntas = makeHandleGetNumeroPreguntas(getNumeroPreguntas);
export const handleGetPreguntasPorCategoria = makeHandleGetPreguntasPorCategoria(getPreguntasPorCategoriaPaginando);
