<template>
	<AppCabeceraTemas :modo="modo" @buscar="textoBusqueda = $event" />

	<div class="grid-categorias">
		<AppCategoriaTemas
			v-for="categoria in categoriasFiltradas"
			:key="categoria.id"
			:categoria="categoria"
			:modo="modo"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AppCabeceraTemas from '../temas/AppCabeceraTemas.vue';
import AppCategoriaTemas from '../temas/AppCategoriaTemas.vue';
import {
	Configuration,
	CategoriasApi,
	CategoriaResumen,
} from '@preparatai/api-client';

// Props para personalizar la página
const props = defineProps<{
	tipoCategoria: 'PRACTICA' | 'EXAMEN' | 'NORMAL';
	modo: 'practica' | 'examen' | 'repaso';
}>();

const api = new CategoriasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const categoriasResumen = ref<CategoriaResumen[]>([]);
const textoBusqueda = ref('');

onMounted(async () => {
	try {
		categoriasResumen.value = await api.getCategoriasResumen({
			tipo: props.tipoCategoria,
		});
	} catch (error) {
		console.error('Error obteniendo el número de preguntas:', error);
	}
});

const categoriasFiltradas = computed(() => {
	if (!textoBusqueda.value) return categoriasResumen.value;

	const busqueda = textoBusqueda.value.toLowerCase();
	return categoriasResumen.value.filter((c) =>
		c.nombre.toLowerCase().includes(busqueda)
	);
});
</script>

<style lang="scss">
.grid-categorias {
	display: grid;
	grid-template-columns: 1fr; /* móvil: 1 por fila */
	gap: 16px;
	padding: 8px;
}

/* móviles grandes */
@media (min-width: 480px) {
	.grid-categorias {
		grid-template-columns: repeat(2, 1fr);
	}
}

/* tablets */
@media (min-width: 768px) {
	.grid-categorias {
		grid-template-columns: repeat(3, 1fr);
	}
}

/* desktop */
@media (min-width: 1024px) {
	.grid-categorias {
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>