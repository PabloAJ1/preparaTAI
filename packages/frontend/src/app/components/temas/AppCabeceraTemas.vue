<template>
	<div class="temas-header">
		<div class="temas-titulo">
			<h2 class="temas-heading">{{ modo === 'repaso' ? 'Repasar Temas' : 'Ejercicios de Práctica' }}</h2>
			<p class="temas-subtitle">
				{{ modo === 'repaso' 
					? 'Selecciona un bloque para realizar tests de repaso.' 
					: 'Relaciona conceptos con sus definiciones correspondientes.' }}
			</p>
		</div>

		<div class="temas-search">
			<div class="search-input-group">
				<span class="search-icon">
					<i class="fa-solid fa-magnifying-glass" />
				</span>

				<input
					type="text"
					class="search-input"
					placeholder="Buscar tema..."
					v-model="textoBusqueda"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
  modo?: 'repaso' | 'practica' | 'examen' ;
}>();

const emit = defineEmits<{
	(e: 'buscar', texto: string): void
}>()

const textoBusqueda = ref('')
watch(textoBusqueda, (valor) => {
	emit('buscar', valor)
})

</script>

<style scoped lang="scss">

.temas-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
}

.temas-heading {
	font-size: 1.75rem;
	font-weight: 700;
	color: #1f2937;
	margin-bottom: 0.25rem;
}

.temas-subtitle {
	color: #6b7280;
	font-size: 0.875rem;
	margin: 0;
}

/* Buscador */

.temas-search {
	display: block;
}

.search-input-group {
	display: flex;
	align-items: center;

	background: white;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	overflow: hidden;
}

.search-icon {
	display: flex;
	align-items: center;
	padding: 0 0.75rem;
	color: #9ca3af;
}

.search-input {
	border: none;
	outline: none;
	padding: 0.5rem 0.75rem;
	font-size: 0.9rem;
	width: 200px;
}

/* Responsive (equivalente a d-none d-md-block) */

@media (max-width: 768px) {
	.temas-search {
		display: none;
	}
}

</style>