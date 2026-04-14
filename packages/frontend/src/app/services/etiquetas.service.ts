import { useQuery } from '@tanstack/vue-query';
import { categoriasApi } from '../api/categoria.wrapper';

export const useCategorias = () => {
	return useQuery({
		queryKey: ['categorias'],
		queryFn: () => categoriasApi.getAll(),
		staleTime: 5 * 60 * 1000,
	});
};
