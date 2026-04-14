<template>
	<div class="form-wrapper">
		<!-- Enunciado -->
		<div class="form-group">
			<label>Enunciado</label>
			<textarea v-model="pregunta.enunciado" />
		</div>

		<!-- Respuesta -->
		<div class="form-group">
			<label>Respuesta Correcta</label>
			<input v-model="pregunta.respuesta" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { PreguntaPracticaNueva } from '@preparatai/api-client';
import { computed } from 'vue';

const props = defineProps<{
	modelValue: PreguntaPracticaNueva;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: PreguntaPracticaNueva): void;
}>();

const pregunta = computed<PreguntaPracticaNueva>({
	get: () => props.modelValue,
	set: (val) => emit('update:modelValue', val)
});

</script>

<style scoped lang="scss">
.form-group {
	margin-bottom: 0.5rem;
}

label {
	font-weight: 600;
	display: block;
	margin-bottom: 0.1rem;
}

textarea {
	width: 100%;
	padding: 0.5rem;
	border-radius: 6px;
	border: 1px solid var(--color-smoke);
	resize: vertical;
	font-size: 0.95rem;
	background-color: var(--color-textbox-bg);
}
</style>