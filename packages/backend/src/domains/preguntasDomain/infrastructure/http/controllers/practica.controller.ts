import { Request, Response, NextFunction } from 'express';
import { ICreatePractica } from '../../../application/signatures/createPractica.interface';
import { components } from '../../../../../types/openapi';
import { practicasBuilder } from '../../../practicasBuilder';
import { IMigrarPracticas } from '../../../application/signatures/migrarPracticas.interface';
import { IGetListadoPracticasConEstadisticas } from '../../../application/signatures/getListadoPracticasConEstadisticas.interface';
import { MapPracticasController } from '../mappers/mapPracticasController.mapper';
import { IGetPreguntasPractica } from '../../../application/signatures/getPracticaById.interface';

type TPracticaNueva = components['schemas']['PracticaNueva'];
type TCategoriaResumen = components['schemas']['CategoriaResumen'];
type TPractica = components['schemas']['Practica'];

const { practica } = practicasBuilder();

export const makeHandleCrearPractica =
	(createPractica: ICreatePractica) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const cuerpo: TPracticaNueva = req.body;
			await createPractica.exec(cuerpo);
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	};

export const makeHandleMigrarPractica =
	(migrarAPracticas: IMigrarPracticas) =>
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			await migrarAPracticas.exec();
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	};


//***********************************
// Get's
// ******************************** */	
export const makeHandleGetPreguntasPractica =
	(getPreguntasPractica: IGetPreguntasPractica) =>
	async (req: Request, res: Response<TPractica>, next: NextFunction) => {
		try {
			const idPregunta = req.params.id;
			const page = parseInt(req.query.page as string) || 1;
			const limit = parseInt(req.query.limit as string) || 20;
			const seed = parseInt(req.query.seed as string) || 0;
			
			const practica = await getPreguntasPractica.exec(
				idPregunta,
				page,
				limit,
				seed
			);
			res.status(200).json(MapPracticasController.toPracticaResponse(practica));
		} catch (err) {
			next(err);
		}
	};

export const makeHandleGetAllWithEstadisticas =
	(practicaGetAllWithEstadisticas: IGetListadoPracticasConEstadisticas) =>
	async (_req: Request, res: Response<TCategoriaResumen[]>, next: NextFunction) => {
		try {
			const practicas = await practicaGetAllWithEstadisticas.exec();
			res.status(200).json(practicas.map(MapPracticasController.toCategoriaResumen));
		} catch (err) {
			next(err);
		}
	};

export const handleGetPreguntasPractica =
	makeHandleGetPreguntasPractica(practica.get.preguntas);
export const handleGetAllWithEstadisticas =
	makeHandleGetAllWithEstadisticas(practica.get.allWithEstadisticas);
export const handleCrearPractica =
	makeHandleCrearPractica(practica.crear);
export const handleMigrarPractica =
	makeHandleMigrarPractica(practica.migrar);