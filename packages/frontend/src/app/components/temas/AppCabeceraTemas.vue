<template>
	<div class="temas-header">
		<div class="cabecera-categorias" :class="cabeceraStyle">
			<i :class="icono" />
			<h2 class="temas-heading">{{ titulo }}</h2>
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
import { computed, ref, watch } from 'vue'
const props = defineProps<{
  modo?: 'repaso' | 'practica' | 'examen' | 'grupo' | 'invertida';
}>();

const emit = defineEmits<{
	(e: 'buscar', texto: string): void
}>()

const textoBusqueda = ref('')
watch(textoBusqueda, (valor) => {
	emit('buscar', valor)
})

const titulo = computed(() => {
	switch (props.modo) {
		case 'practica':
		case 'invertida':
			return 'Ejercicios de Práctica';
		case 'examen':
			return 'Preguntas de Examenes';
		case 'repaso':
		default:
			return 'Repasar Temas';
	}
});

const cabeceraStyle = computed(() => ({
	'tema-color-repaso': props.modo === 'repaso',
	'tema-color-practica': props.modo === 'practica' || props.modo === 'invertida',
	'tema-color-examen': props.modo === 'examen',
	'tema-color-grupo': props.modo === 'grupo',
}));

const icono = computed(() => {
	switch (props.modo) {
		case 'practica':
			return 'fa-solid fa-puzzle-piece';
		case 'examen':
			return 'fa-solid fa-pencil'; // icono para examen
		case 'repaso':
		default:
			return 'fa-solid fa-book';
	}
});

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
	margin-left: 1rem;
}

.tema-color-repaso {
	color: var(--color-cabecera-repaso);
}
.tema-color-examen {
	color: var(--color-cabecera-examen);
}
.tema-color-practica {
	color: var(--color-cabecera-practica);
}
.tema-color-grupo {
	color: var(--color-cabecera-grupo);
}

.cabecera-categorias {
	display: flex;
	align-items: center;
	font-size: 1.25rem;
}

/* Buscador */
.temas-search {
	display: block;
}

.search-input-group {
	display: flex;
	align-items: center;

	background:  var(--color-search-bg);
	border: 1px solid var(--color-search-border);
	border-radius: 8px;
	overflow: hidden;
}

.search-icon {
	display: flex;
	align-items: center;
	padding: 0 0.75rem;
	color: var(--color-search-icon);
}

.search-input {
	border: none;
	outline: none;
	padding: 0.5rem 0.75rem;
	font-size: 0.9rem;
	width: 200px;
	background:  var(--color-search-bg);
	color: var(--color-search-text);
	
	&::placeholder{
		color: var(--color-search-text-placeholder); 
	}
}

/* Responsive (equivalente a d-none d-md-block) */

@media (max-width: 768px) {
	.temas-search {
		display: none;
	}
}

</style>