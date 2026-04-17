import { Request, Response, NextFunction } from 'express';
import { IGetNumeroPreguntas } from '../../../application/signatures/getNumeroPreguntas.interface';
import { preguntasBuilder } from '../../../preguntasBuilder';
import { components } from '../../../../../types/openapi';
import { MapPreguntaController } from '../mappers/mapPreguntasController.mapper';
import { IRegistarEstadisticaByPregunta } from '../../../application/signatures/registarEstadisticaByPregunta.interface';
import { IReiniciarEstadisticas } from '../../../application/signatures/reiniciarEstadisticas.interface';
import { IEnterrarPregunta } from '../../../application/signatures/enterrarPregunta.interface';
import { UpdatePreguntaById } from '../../../application/useCases/updatePreguntaById';
import { IDesenterrarPreguntas } from '../../../application/signatures/desenterrarPreguntas.interface';
import { ICrearPregunta } from '../../../application/signatures/createPregunta.interface';
import { IGetPreguntasPorCateogiraConSession } from '../../../application/signatures/getPreguntasPorCateogiraConSession.interface';

type TPreguntas = components['schemas']['Pregunta'];
type TListaDePreguntasPorCategoria = components['schemas']['ListaDePreguntasPorCategoria'];

const { pregunta } = preguntasBuilder();

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
	(getPreguntasPorCategoria: IGetPreguntasPorCateogiraConSession) =>
	async (req: Request, res: Response<TListaDePreguntasPorCategoria>, next: NextFunction) => {
		try {
			const categoria = decodeURIComponent(req.params.categoria);
			const page = parseInt(req.query.page as string) || 1;
			const limit = parseInt(req.query.limit as string) || 20;
			const seed = parseInt(req.query.seed as string) || 0;
			const preguntas = await getPreguntasPorCategoria.exec(
				categoria,
				page,
				limit,
				seed
			);

			res.json(MapPreguntaController.toTypoListaPoblada(preguntas));
		} catch (err) {
			next(err);
		}
	};

export const makeHandleRegistarEstadisticaByPregunta =
	(registarEstadisticaByPregunta: IRegistarEstadisticaByPregunta) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const idPregunta = req.params.id;
			const { acertada } = req.body;

			await registarEstadisticaByPregunta.exec(idPregunta, acertada);
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	};

export const makeHandleReiniciarEstadisticas =
	(reiniciarEstadisticas: IReiniciarEstadisticas) =>
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			await reiniciarEstadisticas.exec();
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	};

export const makeHandleEnterrarPregunta =
	(enterrarPregunta: IEnterrarPregunta) =>
	async (req: Request, res: Response<number>, next: NextFunction) => {
		try {
			const idPregunta = req.params.id;
			await enterrarPregunta.exec(idPregunta);
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	};

export const makeHandleEditarPregunta =
	(editarEnunciadoPreguntaById: UpdatePreguntaById) =>
	async (req: Request, res: Response<TPreguntas>, next: NextFunction) => {
		try {
			const cuerpo: TPreguntas = req.body;
			const preguntaEditada = await editarEnunciadoPreguntaById.exec(MapPreguntaController.toDtoInterno(cuerpo));
			res.json(MapPreguntaController.toType(preguntaEditada));
		} catch (err) {
			next(err);
		}
	};

export const makeHandleDesenterrarPreguntas =
	(desenterrarPreguntas: IDesenterrarPreguntas) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await desenterrarPreguntas.exec();
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	};

export const makeHandleCrearPregunta =
	(crearPregunta: ICrearPregunta) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const cuerpo: TPreguntas = req.body;
			await crearPregunta.exec(MapPreguntaController.toDtoInterno(cuerpo));
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	};

export const handleCrearPregunta =
	makeHandleCrearPregunta(pregunta.create);
export const handleGetNumeroPreguntas =
	makeHandleGetNumeroPreguntas(pregunta.get.count);
export const handleGetPreguntasPorCategoria =
	makeHandleGetPreguntasPorCategoria(pregunta.get.withSession);
export const handleRegistarEstadisticaByPregunta =
	makeHandleRegistarEstadisticaByPregunta(pregunta.estadisticas.registrar);
export const handleReiniciarEstadisticas = makeHandleReiniciarEstadisticas(
	pregunta.estadisticas.reiniciar
);
export const handleEnterrarPregunta =
	makeHandleEnterrarPregunta(pregunta.update.enterrar);
export const handleEditarPregunta = makeHandleEditarPregunta(
	pregunta.update.atributos
);
export const handleDesenterrarPreguntas =
	makeHandleDesenterrarPreguntas(pregunta.update.desenterrar);
