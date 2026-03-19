import { Request, Response, NextFunction } from "express";
import { IGetNumeroPreguntas } from "../../../application/signatures/getNumeroPreguntas.interface";
import { preguntasBuilder } from "../../../preguntasBuilder";

const {
	getNumeroPreguntas
} = preguntasBuilder()

export const makeHandleGetNumeroPreguntas = (getNumeroPreguntas: IGetNumeroPreguntas) => 
	async (
		_req: Request,
		res: Response<number>,
		next: NextFunction
	) => {
		try{
			const numeroPreguntas = await getNumeroPreguntas.exec();
			res.json(numeroPreguntas)
		} catch(err){
			next(err);
		}
	}

export const handleGetNumeroPreguntas = makeHandleGetNumeroPreguntas(getNumeroPreguntas)