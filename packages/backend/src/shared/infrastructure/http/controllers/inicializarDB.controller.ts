import { Request, Response, NextFunction } from 'express';
import { IInicializarDB } from "../../../application/signatures/inicializarDB.interface";
import { inicializarDBBuilder } from "../../../build/inicializarDB.builder";

const {
	inicializarDB
} = inicializarDBBuilder();

export const makeHandleInicializarDB =
	(inicializarDB: IInicializarDB) =>
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const numeroPreguntas = await inicializarDB.exec();
			res.json(numeroPreguntas);
		} catch (err) {
			next(err);
		}
	};

export const handleInicializarDB =
	makeHandleInicializarDB(inicializarDB);