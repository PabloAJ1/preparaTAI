import { GetNumeroPreguntasPorCategoria } from "../preguntasDomain/application/useCases/getNumeroPreguntasPorCategoria";
import { PreguntaRepositoryMySQL } from "../preguntasDomain/infrastructure/mysql/repositories/preguntaRepositoryMySQL.repository";
import { GetCategoriasResumen } from "./application/useCases/getCategoriasResumen";
import { PreguntaAdapterPort } from "./infrastructure/adapters/ports/preguntaAdapterPort";
import { CategoriasMySQLRepository } from "./infrastructure/mysql/repositories/categoriasMySQLRepository.repository";

export const categoriaBuilder = () => {
	const categoriasMySQLRepository = new CategoriasMySQLRepository();
		
	const preguntasMySQLRepository = new PreguntaRepositoryMySQL();
	const getNumeroPreguntasPorCategoria = new GetNumeroPreguntasPorCategoria(preguntasMySQLRepository);
	const preguntaAdapterPort = new PreguntaAdapterPort(getNumeroPreguntasPorCategoria)

	const getCategoriaResumen = new GetCategoriasResumen(
		categoriasMySQLRepository,
		preguntaAdapterPort
	)

	return {
		getCategoriaResumen
	}
}