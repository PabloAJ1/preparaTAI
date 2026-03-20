<template>
	<AppCabeceraCuestionario 
		:nombre="nombre" 
		:totalPreguntas="numeroPreguntas" 
	/>
</template>

<script setup lang="ts">
import AppCabeceraCuestionario from '../components/cuestionarios/AppCabeceraCuestionario.vue';
import { ref, onMounted, defineProps } from 'vue';
import { Configuration, PreguntasApi, Pregunta } from '@preparatai/api-client';

const api = new PreguntasApi(
	new Configuration({ basePath: 'http://localhost:3000/api' })
);

const numeroPreguntas = 0;

const props = defineProps<{
	id: string;
	nombre: string;
}>();

const categoriasResumen = ref<Pregunta[]>([]); // inicializamos con array vacío
onMounted(async () => {
	try {
		categoriasResumen.value = await api.getPreguntasPorCategoria({id: props.id});
	} catch (error) {
		console.error('Error obteniendo el número de preguntas:', error);
	}
});

</script>