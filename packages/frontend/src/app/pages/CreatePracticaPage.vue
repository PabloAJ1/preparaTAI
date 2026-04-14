<template>
	<div class="page">
		<div class="container">
			<AppPracticasForm v-model="pregunta" />

			<div class="save-bar">
				<button class="btn btn-save" @click="guardarPregunta">
					<i class="fa-regular fa-floppy-disk" />
					Guardar preguntas
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Configuration, PracticaNueva, PracticasApi } from '@preparatai/api-client';
import { ref, watch } from 'vue';
import AppPracticasForm from '../components/cuestionarios/AppPracticasForm.vue';

const pregunta = ref<PracticaNueva>();

const api = new PracticasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

async function guardarPregunta() {
	if (!pregunta.value) return;
	await api.createPractica({
		practicaNueva: pregunta.value
	})	
}

watch(pregunta, () => {
}, { deep: true });
</script>

<style lang="scss">
.page {
	display: flex;
	justify-content: center;
	padding: 2rem;
	background: var(--bg-main);
	color: var(--color-text-main);
}


.save-bar {
	display: flex;
	justify-content: flex-end;
	padding-top: 1rem;
}

/* Save button */
.btn-save {
	background: #10b981;
	color: white;
	border-radius: 8px;
	padding: 0.6rem 1rem;
	transition: all 0.2s ease;
}

.btn-save:hover {
	background: #059669;
	transform: translateY(-1px);
}
</style>