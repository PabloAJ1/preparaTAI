import { Request, Response, NextFunction } from "express"
import { IGetCategoriasResumen } from "../../../application/signatures/getCategoriasResumen.interface";
import { components } from "../../../../../types/openapi";
import { MapCategoriasResumen } from "../mappers/mapCategoriasResumen.mapper";
import { categoriaBuilder } from "../../../../../domains/categoriasDomain/categoriaBuilder";

type TCategoriaResumen = components["schemas"]["CategoriaResumen"]

const {
	getCategoriaResumen
} = categoriaBuilder();

export const makeHandleGetCategoriasResumen = (
	getCategoriasResumen: IGetCategoriasResumen
) =>
	async (
		req: Request,
		res: Response<TCategoriaResumen[]>,
		next: NextFunction
	) => {
		try{ 
			const tipo = req.query.tipo as string
			const tipoMap: Record<string, "CUESTIONARIO" | "EXAMEN" | "NORMAL"> = {
				CUESTIONARIO: "CUESTIONARIO",
				EXAMEN: "EXAMEN",
				NORMAL: "NORMAL",
			};
			const tipoCategoria = tipoMap[tipo?.toUpperCase() ?? "NORMAL"];


			const result = await getCategoriasResumen.exec(tipoCategoria);
			const resultMapeado = result.map(MapCategoriasResumen.toReturnType)

			res.json(resultMapeado)
		} catch(err){
			next(err);
		}
	}

export const handleGetCategoriasResumen = makeHandleGetCategoriasResumen(getCategoriaResumen);