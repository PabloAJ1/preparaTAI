import { Request, Response, NextFunction } from "express"
import { IGetCategoriasByTipoResumen } from "../../../application/signatures/getCategoriasResumen.interface";
import { components } from "../../../../../types/openapi";
import { MapCategoriasResumen } from "../mappers/mapCategoriasResumen.mapper";
import { categoriaBuilder } from "../../../../../domains/categoriasDomain/categoriaBuilder";
import { IGetCategoriaById } from "../../../application/signatures/getCategoriaById.interface";
import { MapCategorias } from "../mappers/mapCategorias.mapper";
import { IGetAllCategorias } from "../../../application/signatures/getAllCategorias.interface";

type TCategoriaResumen = components["schemas"]["CategoriaResumen"]
type TCategoria = components["schemas"]["Categoria"]

const { categorias } = categoriaBuilder();

export const makeHandleGetCategoriasResumen = (
	getCategoriasResumen: IGetCategoriasByTipoResumen
) =>
	async (
		req: Request,
		res: Response<TCategoriaResumen[]>,
		next: NextFunction
	) => {
		try{ 
			const tipo = req.query.tipo as string
			const tipoMap: Record<string, "PRACTICA" | "EXAMEN" | "NORMAL" | "GRUPOPREGUNTAS"> = {
				PRACTICA: "PRACTICA",
				EXAMEN: "EXAMEN",
				NORMAL: "NORMAL",
				GRUPOPREGUNTAS: "GRUPOPREGUNTAS",
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
	getCategoriaById: IGetCategoriaById
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


export const makeHandleGetAllCategoria = (
	getAllCategorias: IGetAllCategorias
) => 
	async (
		_req: Request,
		res: Response<TCategoria[]>,
		next: NextFunction
	) => {
		try{
			const categoria = await getAllCategorias.exec()
			res.json(categoria.map(MapCategorias.toReturnType))
		}catch(err){
			next(err)
		}
	}

export const handles = {
	getAll: makeHandleGetAllCategoria(categorias.getAll),
	getResumen: makeHandleGetCategoriasResumen(categorias.getResumen),
	getById: makeHandleGetCategoriaById(categorias.getById)
}