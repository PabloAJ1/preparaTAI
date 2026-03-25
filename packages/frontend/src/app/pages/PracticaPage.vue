<template>
	<AppCabeceraTemas modo="practica" />

	<div class="row g-4">
		<AppCategoriaTemas
			v-for="categoria in categoriasResumen"
			:key="categoria.id"
			:categoria="categoria"
			modo="practica"
		/>
	</div>
</template>

<script setup lang="ts">
import AppCabeceraTemas from '../components/temas/AppCabeceraTemas.vue';
import AppCategoriaTemas from '../components/temas/AppCategoriaTemas.vue';
import { ref, onMounted } from 'vue';
import { Configuration, CategoriasApi, CategoriaResumen } from '@preparatai/api-client';

const api = new CategoriasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const tipoCategoria = 'CUESTIONARIO';
const categoriasResumen = ref<CategoriaResumen[]>([]); // inicializamos con array vacío
onMounted(async () => {
	try {
		categoriasResumen.value = await api.getCategoriasResumen({
            tipo: tipoCategoria
        });
	} catch (error) {
		console.error('Error obteniendo el número de preguntas:', error);
	}
});

</script>