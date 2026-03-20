import { Request, Response, NextFunction } from "express"
import { IGetCategoriasResumen } from "../../../application/signatures/getCategoriasResumen.interface";
import { components } from "../../../../../types/openapi";
import { MapCategoriasResumen } from "../mappers/mapCategoriasResumen.mapper";
import { categoriaBuilder } from "@/domains/categoriasDomain/categoriaBuilder";

type TCategoriaResumen = components["schemas"]["CategoriaResumen"]

const {
	getCategoriaResumen
} = categoriaBuilder();

export const makeHandleGetCategoriasResumen = (
	getCategoriasResumen: IGetCategoriasResumen
) =>
	async (
		_req: Request,
		res: Response<TCategoriaResumen[]>,
		next: NextFunction
	) => {
		try{
			const result = await getCategoriasResumen.exec();
			const resultMapeado = result.map(MapCategoriasResumen.toReturnType)

			console.log(resultMapeado);
			res.json(resultMapeado)
		} catch(err){
			next(err);
		}
	}

export const handleGetCategoriasResumen = makeHandleGetCategoriasResumen(getCategoriaResumen);