import { Request, Response, NextFunction } from "express"
import { IGetCategoriasByTipo } from "../../../application/signatures/getCategoriasResumen.interface";
import { components } from "../../../../../types/openapi";
import { MapCategoriasResumen } from "../mappers/mapCategoriasResumen.mapper";
import { categoriaBuilder } from "../../../../../domains/categoriasDomain/categoriaBuilder";
import { IGetCategoriasById } from "../../../application/signatures/getCategoriaById.interface";
import { MapCategorias } from "../mappers/mapCategorias.mapper";

type TCategoriaResumen = components["schemas"]["CategoriaResumen"]
type TCategoria = components["schemas"]["Categoria"]

const {
	getCategoriaResumen,
	getCategoriaById
} = categoriaBuilder();

export const makeHandleGetCategoriasResumen = (
	getCategoriasResumen: IGetCategoriasByTipo
) =>
	async (
		req: Request,
		res: Response<TCategoriaResumen[]>,
		next: NextFunction
	) => {
		try{ 
			const tipo = req.query.tipo as string
			const tipoMap: Record<string, "PRACTICA" | "EXAMEN" | "NORMAL"> = {
				PRACTICA: "PRACTICA",
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

export const makeHandleGetCategoriaById = (
	getCategoriaById: IGetCategoriasById
) => 
	async (
		req: Request,
		res: Response<TCategoria>,
		next: NextFunction
	) => {
		try{
			const idCategoria = req.params.id;
			const categoria = await getCategoriaById.exec(idCategoria)
			res.json(MapCategorias.toReturnType(categoria))
		}catch(err){
			next(err)
		}
	}

export const handleGetCategoriasResumen = makeHandleGetCategoriasResumen(getCategoriaResumen);
export const handleGetCategoriaById = makeHandleGetCategoriaById(getCategoriaById);