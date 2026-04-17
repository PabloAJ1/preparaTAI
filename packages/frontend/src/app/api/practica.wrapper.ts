import { PracticasApi, Configuration } from '@preparatai/api-client';

const api = new PracticasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL }),
);

export const practicaApi = {
	getAll: () => api.getAllPracticas(),
	getById: (id: string, page: number, limit: number, seed: number) => 
		api.getPracticaById({
			id,
			page,
			limit,
			seed,
		}),
	getInvertido: (id: string, page: number, limit: number, seed: number) => 
		api.getPracticaByIdInvertida({
			id,
			page,
			limit,
			seed,
		}),
};
