import { Request, Response, NextFunction } from 'express';
import { IGetGrupoPreguntasByIdCategoria } from '../../../applications/signatures/getGrupoPreguntasByIdCategoria.interface';
import { grupoPreguntasBuilder } from '../../../grupoPreguntasBuilder';
import { components } from '../../../../../types/openapi';
import { MapGrupoPreguntasController } from '../mappers/mapGrupoPreguntasController.mapper';

type TGrupoPreguntas = components['schemas']['GrupoPreguntasRelacionadas'];

const {
	getGrupoPreguntasByIdCategoria
} = grupoPreguntasBuilder();

export const makeHandleGetGrupoPreguntasByIdCategoria =
	(getGrupoPreguntasByIdCategoria: IGetGrupoPreguntasByIdCategoria) =>
	async (req: Request, res: Response<TGrupoPreguntas[]>, next: NextFunction) => {
		try {
			const idCategoria = req.params.id;
			const gruposPreguntas = await getGrupoPreguntasByIdCategoria.exec(idCategoria);
			res.json(gruposPreguntas.map(MapGrupoPreguntasController.toResponse));
		} catch (err) {
			next(err);
		}
	};

export const handleGetGrupoPreguntasByIdCategoria =
	makeHandleGetGrupoPreguntasByIdCategoria(getGrupoPreguntasByIdCategoria);