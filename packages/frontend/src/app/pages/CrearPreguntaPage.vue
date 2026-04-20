<template>
	<div class="cuerpo">
		<AppEditPreguntaCuestionario
			:pregunta-editando="nuevaPregunta"
			@update="nuevaPregunta = $event"
		/>
		
		<button 
			class="btn btn-save" 
			@click="guardarPregunta"
		>
			<i class="fa-regular fa-floppy-disk" /> Guardar
		</button>
	</div>
</template>

<script setup lang="ts">
import { Configuration, Pregunta, PreguntasApi } from '@preparatai/api-client';
import AppEditPreguntaCuestionario from '../components/cuestionarios/AppEditPreguntaCuestionario.vue';
import { ref } from 'vue';

const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const nuevaPregunta = ref<Pregunta>({
	estado: 'REVISADO',
	enunciado: '',
	codigo: '',
	respuestas: [
		{ enunciado: '', correcta: false, id: 'nuevo-1' },
		{ enunciado: '', correcta: false, id: 'nuevo-2' },
		{ enunciado: '', correcta: false, id: 'nuevo-3' },
		{ enunciado: '', correcta: false, id: 'nuevo-4' }
	],
	categorias: [],
	estadisticas: { aciertos: 0, fallos: 0, total: 0 },
	id: 'nuevo'
});

async function guardarPregunta() {
	console.log(nuevaPregunta);
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