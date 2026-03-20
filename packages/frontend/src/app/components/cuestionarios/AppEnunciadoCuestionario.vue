<template>
	<div class="card-header bg-white border-bottom-0 pt-4 pb-0">
		<h5 class="fw-bold text-dark d-flex">
			<span class="badge bg-primary me-3 align-self-start">
				{{ indice + 1 }}
			</span>
			<span>{{ pregunta.enunciado }}</span>
		</h5>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Pregunta } from '@preparatai/api-client';

const props = defineProps<{
	pregunta: Pregunta;
	indice: number;
}>();
</script>