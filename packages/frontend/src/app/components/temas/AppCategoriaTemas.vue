<template>
	<div class="categoria-card-wrapper">
		<div class="categoria-card">
			<div class="categoria-card-body">
				<div class="categoria-header">
					<div class="categoria-icon" :class="iconoClase">
						<i :class="icono" />
					</div>
				</div>

				<h5 class="categoria-title">
					{{ categoria.nombre }}
				</h5>

				<h6 class="categoria-count">
					{{ categoria.numeroPreguntas }} pregunta/s
				</h6>

				<router-link
					v-if="categoria?.id"
					:class="linkClase"
					:to="{ name: 'TestByCategoria', params: { id: categoria.id } }"
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
			return 'fa-solid fa-puzzle-piece'; // icono para compacto
		case 'repaso':
		default:
			return 'fa-solid fa-book'; // icono por defecto/resumen
	}
});

const linkClase = computed(() => ({
	'categoria-link-repaso': props.modo === 'repaso',
	'categoria-link-practica': props.modo === 'practica',
}));

const iconoClase = computed(() => ({
	'categoria-icon-repaso': props.modo === 'repaso',
	'categoria-icon-practica': props.modo === 'practica',
}));
</script>

<style scoped lang="scss">
@use 'sass:color';

.categoria-card-wrapper {
	width: 25%;
}

.categoria-card {
	background: white;
	border-radius: 16px;
	border: none;
	height: 100%;

	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);

	transition: transform 0.25s ease, box-shadow 0.25s ease;

	&:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
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

	background: rgba(59, 130, 246, 0.1);
	color: #2563eb;

	font-size: 1.25rem;
}

.categoria-title {
	font-weight: 700;
	color: #1f2937;
	margin-bottom: 0.5rem;
}

.categoria-count {
	color: #6b7280;
	margin-bottom: 1rem;
}

.categoria-link-icon {
	margin-left: 0.5rem;
}

.categoria-icon-repaso {
	background: rgba(59, 130, 246, 0.1);
	color: #2563eb;
}

.categoria-icon-practica {
	background: rgba(25, 135, 84, 0.1);
	color: #198754;
}

/* Links/botones */
.categoria-link-repaso {
	color: #2563eb;
	&:hover {
		color: #1d4ed8;
	}
}

.categoria-link-practica {
	color: #198754;
	&:hover {
		color: color.adjust(#198754, $lightness: -10%);
	}
}
</style>
