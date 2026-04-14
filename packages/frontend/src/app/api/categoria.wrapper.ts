import { CategoriasApi, Configuration } from '@preparatai/api-client';

const api = new CategoriasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL }),
);

export const categoriasApi = {
	getAll: () => api.getAllCategorias(),
	create: (nombreCategoriaNueva: string) =>
		api.createCategoria({ categoriaNueva: { nombre: nombreCategoriaNueva } }),
	getCategoriasResumen: (tipoCategoria: string) =>
		api.getCategoriasResumen({
			tipo: tipoCategoria,
		}),
};
