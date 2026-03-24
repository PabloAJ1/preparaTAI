<template>
	<div :id="props.id" class="cuestionario-card">
		<AppEnunciadoCodeCuestionario
			v-if="props.pregunta"
			:enunciado="props.pregunta.enunciado"
			:indice="props.indice"
		/>

		<div class="respuestas-lista">
			<AppRespuestaCuestionario
				v-for="respuesta in props.pregunta.respuestas"
				:key="respuesta.enunciado"
				:respuesta="respuesta"
				:respondida="respondida"
				:seleccionada="respuestaSeleccionada"
				@seleccionar="verificarRespuesta"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Pregunta, Respuesta } from '@preparatai/api-client';
import AppRespuestaCuestionario from './AppRespuestaCuestionario.vue';
import AppEnunciadoCodeCuestionario from './AppEnunciadoCodeCuestionario.vue';

const props = defineProps<{
	pregunta: Pregunta;
	indice: number;
	id: string;
}>();

const respondida = ref(false);
const respuestaSeleccionada = ref<Respuesta | null>(null);

function verificarRespuesta(respuesta: Respuesta) {
	if (respondida.value) return;
	respuestaSeleccionada.value = respuesta;
	respondida.value = true;
}
</script>

<style scoped lang="scss">
// Definimos variables de color para que sea fácil de mantener
$border-color: #e2e8f0;
$bg-hover: #f8fafc;

.cuestionario-card {
	background: white;
	border-radius: 0.6rem;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
}

.respuestas-lista {
	margin-top: 1rem;
	border: 1px solid $border-color;
	border-radius: 0.5rem;
	overflow: hidden; // Para que las esquinas de los hijos no pisen el redondeado del padre
	background: white;
}
</style>
