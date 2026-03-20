<template>
	<div class="col-md-6 col-xl-4">
		<div class="card h-100 shadow-sm hover-card bg-white border-0">
			<div class="card-body position-relative overflow-hidden">
				<div class="d-flex justify-content-between align-items-start mb-4">
					<div class="rounded-circle bg-primary bg-opacity-10 p-3 text-primary">
						<i class="fa-solid fa-book fs-4" />
					</div>
				</div>
				<h5 class="card-title fw-bold text-dark">
					{{ categoria.nombre }}
				</h5>
				<h6>{{ categoria.numeroPreguntas }} pregunta/s</h6>
				<p class="text-muted small mb-4">
					Preguntas teóricas y supuestos prácticos.
				</p>
				<router-link
					v-if="categoria?.id"
					:to="{ name: 'TestByCategoria', params: { id: categoria.id, nombre: categoria.nombre } }"
				>
					Comenzar <i class="fa-solid fa-arrow-right ms-2" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { CategoriaResumen } from '@preparatai/api-client';

const props = defineProps<{
	categoria: CategoriaResumen;
}>();

console.log(props.categoria);
</script>
