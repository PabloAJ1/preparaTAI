<template>
	<div class="categoria-card-wrapper">
		<div class="categoria-card">
			<div class="categoria-card-body">
				<div class="categoria-header">
					<div class="categoria-icon" :class="iconoClase">
						<i :class="icono" />
					</div>
				</div>

				<h5 
					class="categoria-title"
					:title="categoria.nombre"
					:aria-label="categoria.nombre"
				>
					{{ categoria.nombre }}
				</h5>

				<h6 class="categoria-count">
					{{ categoria.numeroPreguntas }} pregunta/s
				</h6>

				<router-link
					v-if="categoria?.id"
					:class="linkClase"
					:modo="modo"
					:to="{ name: 'TestByCategoria', params: { id: categoria.id, modo: modo } }"
				>
					Comenzar
					<i class="fa-solid fa-arrow-right categoria-link-icon" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CategoriaResumen } from '@preparatai/api-client';
import { computed } from 'vue';

const props = defineProps<{
	categoria: CategoriaResumen;
	modo?: 'repaso' | 'practica' | 'examen';
}>();

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

const linkClase = computed(() => ({
	'categoria-link-repaso': props.modo === 'repaso',
	'categoria-link-practica': props.modo === 'practica',
	'categoria-link-examen': props.modo === 'examen',
}));

const iconoClase = computed(() => ({
	'categoria-icon-repaso': props.modo === 'repaso',
	'categoria-icon-practica': props.modo === 'practica',
	'categoria-icon-examen': props.modo === 'examen',
}));
</script>

<style scoped lang="scss">
@use 'sass:color';

.categoria-card-wrapper {
	width: 100%;
	height: 100%;
}

.categoria-card {
	background: var(--color-white);
	border-radius: 16px;
	border: none;
	height: 100%;

	box-shadow: 0 10px 15px -3px var(--shadow-md),
		0 4px 6px -2px var(--shadow-sm);

	transition: transform 0.25s ease, box-shadow 0.25s ease;

	&:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 30px -10px var(-color-shadow-fat);
	}
}

.categoria-card-body {
	position: relative;
	overflow: hidden;
	padding: 1.75rem;
}

.categoria-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1rem;
}

.categoria-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	font-size: 1.25rem;
}

.categoria-title {
	min-height: 2.6rem;
	font-weight: 700;
	color: var(--color-temas-heading);
	margin-bottom: 0.5rem;

	font-size: 1.1rem;
	margin-top: 0.5rem;
	text-overflow: ellipsis;
	max-width: 100%;

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.categoria-count {
	color: var(--color-btn-toggle-loyouts);
	margin-bottom: 1rem;
}

.categoria-link-icon {
	margin-left: 0.5rem;
}

.categoria-icon-repaso {
	background: var(--color-repasos-bg);
	color: var(--color-repasos);
}

.categoria-icon-practica {
	background: var(--color-practicas-bg);
	color: var(--color-practicas)
}

/* Links/botones */
.categoria-link-repaso {
	color: var(--color-repasos);
	&:hover {
		color: var(--color-repasos);
	}
}

.categoria-link-practica {
	color: var(--color-practicas);
	&:hover {
			color: color-mix(in srgb, var(--color-practicas) 90%, var(--color-black));
	}
}

.categoria-icon-examen {
	background: var(--color-examenes-bg);
	color: var(--color-examenesn);
}

.categoria-link-examen {
	color: var(--color-examenes);
	&:hover {
		color: color-mix(in srgb, var(--color-examenes) 90%, var(--color-black));
	}
}
</style>
