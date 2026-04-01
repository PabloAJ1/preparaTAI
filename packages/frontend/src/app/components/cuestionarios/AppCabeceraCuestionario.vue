<template>
	<div class="cuestionario-header">
		<h2 class="cuestionario-titulo">
			<i class="fa-solid fa-clipboard-question cuestionario-icono" />
			{{ nombreCategoria }}
		</h2>

		<span class="cuestionario-contador">
			{{ props.totalPreguntas }} Preguntas
		</span>
	</div>
</template>

<script setup lang="ts">
import { CategoriasApi, Configuration } from '@preparatai/api-client';
import { onMounted, ref } from 'vue';


const api = new CategoriasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const props = defineProps<{
	nombre: string;
	totalPreguntas: number;
}>();
const nombreCategoria = ref("");

onMounted(async () => {
	const categoria = await api.getOneCategoriaById({ id: props.nombre });
	nombreCategoria.value = categoria.nombre
})

</script>

<style scoped lang="scss">
.cuestionario-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
}

.cuestionario-titulo {
	color: var(--color-cuestionario-text-primary);
	font-weight: 700;
	font-size: 2rem;
	margin: 0;
	display: flex;
	align-items: center;
}

.cuestionario-icono {
	margin-right: 0.75rem;
}

.cuestionario-contador {
	background-color: var(--menu-text-secondary);
	color: var(--color-white);
	padding: 0.5rem 1rem;
	font-size: 1rem;
	font-weight: 600;
	border-radius: 50rem; // rounded-pill
}
</style>
