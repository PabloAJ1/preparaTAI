<template>
	<div class="d-flex justify-content-between align-items-center mb-4">
		<h2 class="text-primary fw-bold"><i class="fa-solid fa-clipboard-question"></i> {{ nombre }}</h2>
		<span class="badge bg-secondary fs-6 rounded-pill">{{ totalPreguntas }} Preguntas</span>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Pregunta } from '@preparatai/api-client';

const props = defineProps<{
	nombre: string;
	totalPreguntas: number;
}>();
</script>