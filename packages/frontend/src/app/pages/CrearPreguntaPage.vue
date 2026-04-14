<template>
	<div class="cuerpo">
		<AppEditPreguntaCuestionario @update="nuevaPregunta = $event" />
		
		<button class="btn btn-save" @click="guardarPregunta">
			<i class="fa-regular fa-floppy-disk"></i> Guardar
		</button>
	</div>
</template>

<script setup lang="ts">
import { Configuration, Pregunta, PreguntasApi } from '@preparatai/api-client';
import AppEditPreguntaCuestionario from '../components/cuestionarios/AppEditPreguntaCuestionario.vue';
import { ref } from 'vue';

const nuevaPregunta = ref<Pregunta | null>(null);
const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

async function guardarPregunta() {
	if (!nuevaPregunta.value) return;

	await api.createPregunta({
		pregunta: nuevaPregunta.value
	})
}

</script>

<style lang="scss">
.cuerpo {
	color: var(--color-text-main);
}

.btn {
	border: none;
	border-radius: 6px;
	padding: 6px 14px;
	cursor: pointer;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	gap: 6px;
}

.btn-save {
	background: transparent;
	color: var(--color-text-main);
}
</style>