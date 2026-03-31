<template>
	<div
		class="respuestas-lista"
		:class="{ 'modo-practica': modo === 'practica' }"
	>
		<AppRespuestaCuestionario
			v-for="respuesta in respuestas"
			:key="respuesta.enunciado"
			:respuesta="respuesta"
			:respondida="respondida"
			:seleccionada="seleccionada"
			:modo="modo"
			@seleccionar="seleccionar"
		/>
	</div>
</template>

<script setup lang="ts">
import AppRespuestaCuestionario from './AppRespuestaCuestionario.vue';
import type { Respuesta } from '@preparatai/api-client';

const props = defineProps<{
	respuestas: Respuesta[];
	respondida: boolean;
	seleccionada: Respuesta | null;
	modo: string;
}>();

const emit = defineEmits<{
	(e: 'seleccionar', respuesta: Respuesta): void;
}>();

function seleccionar(respuesta: Respuesta) {
	emit('seleccionar', respuesta);
}
</script>
