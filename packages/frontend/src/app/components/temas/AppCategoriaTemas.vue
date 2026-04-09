<template>
	<div class="categoria-card-wrapper">
		<div class="categoria-card">
			<div class="categoria-card-body">
				<div class="categoria-header">
					<div class="categoria-icon" :class="iconoClase">
						<i :class="icono" />
					</div>

					<h5
						class="categoria-title"
						:title="categoria.nombre"
						:aria-label="categoria.nombre">
						{{ categoria.nombre }}
					</h5>
				</div>

				<div class="categoria-info">
					<div class="categoria-count">
						{{ categoria.numeroPreguntas }} pregunta/s
					</div>

					<div class="categoria-stats">
						<div class="stat stat-ok">
							<i class="fa-solid fa-check"></i>
							{{ categoria.estadisticas.aciertos }}
						</div>

						<div class="stat stat-ko">
							<i class="fa-solid fa-xmark"></i>
							{{ categoria.estadisticas.fallos }}
						</div>
					</div>

					<router-link
						v-if="categoria?.id"
						:key="$route.name"
						:class="linkClase"
						:modo="modo"
						:to="{
							name: modo !== 'grupo' ? 'TestByCategoria' : 'TestByGrupo',
							params: { id: categoria.id, modo: modo },
						}"
						class="categoria-link">
						Comenzar
						<i class="fa-solid fa-arrow-right categoria-link-icon" />
					</router-link>

					<div class="categoria-percent" :style="{ color: colorPorcentaje }">
						<i class="fa-solid fa-chart-simple"></i>
						{{ porcentajeAcierto }}%
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CategoriaResumen } from '@preparatai/api-client';
import { computed } from 'vue';

const props = defineProps<{
	categoria: CategoriaResumen;
	modo?: 'repaso' | 'practica' | 'examen' | 'grupo';
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
	'categoria-link-grupo': props.modo === 'grupo',
}));

const iconoClase = computed(() => ({
	'categoria-icon-repaso': props.modo === 'repaso',
	'categoria-icon-practica': props.modo === 'practica',
	'categoria-icon-examen': props.modo === 'examen',
	'categoria-icon-grupos': props.modo === 'grupo',
}));

const porcentajeAcierto = computed(() => {
	const stats = props.categoria.estadisticas;
	if (!stats || stats.total === 0) return 0;

	return Math.round((stats.aciertos / stats.total) * 100);
});

const colorPorcentaje = computed(() => {
	const p = porcentajeAcierto.value;

	if (p === 0) return 'var(--color-stat-intentos)';

	const hue = p * 1.2; // 0 → 120

	return `hsl(${hue}, 65%, 42%)`;
});
</script>

<style scoped lang="scss">
@use 'sass:color';

.categoria-card-wrapper {
	width: 100%;
	height: 100%;
}

.categoria-card {
	background: var(--color-cards-bg);
	border-radius: 16px;
	border: none;
	height: 100%;

	box-shadow: 0 10px 15px -3px var(--shadow-md), 0 4px 6px -2px var(--shadow-sm);

	transition: transform 0.25s ease, box-shadow 0.25s ease;

	&:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 30px -10px var(--color-shadow-fat);
	}
}

.categoria-card-body {
	position: relative;
	overflow: hidden;
	padding: 1.75rem;
}

.categoria-header {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	margin-bottom: 0.75rem;
}


.categoria-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	font-size: 1.25rem;
	flex-shrink: 0;   // 👈 evita que se estreche
}

.categoria-title {
	margin: 0;
	font-weight: 700;
	color: var(--color-cuestionario-text-secundary);
	font-size: 1.1rem;
	line-height: 1.3;
	text-overflow: ellipsis;
	max-width: 100%;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.categoria-info {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: auto auto;
	gap: 0.5rem 1rem;
	align-items: center;
}

.categoria-count {
	color: var(--color-cuestionario-text-tertiary);
	margin-bottom: 1rem;
	grid-column: 1;
	grid-row: 1;
}

.categoria-link-icon {
	grid-column: 1;
	grid-row: 2;
}

/* Links/botones */
.categoria-icon-repaso {
	background: var(--color-repasos-bg);
	color: var(--color-repasos);
}

.categoria-link-repaso {
	color: var(--color-repasos);
	&:hover {
		color: color-mix(in srgb, var(--color-repasos) 90%, var(--color-black));
	}
}

.categoria-icon-practica {
	background: var(--color-practicas-bg);
	color: var(--color-practicas);
}

.categoria-link-practica {
	color: var(--color-practicas);
	&:hover {
		color: color-mix(in srgb, var(--color-practicas) 90%, var(--color-black));
	}
}

.categoria-icon-examen {
	background: var(--color-examenes-bg);
	color: var(--color-examenes);
}

.categoria-link-examen {
	color: var(--color-examenes);
	&:hover {
		color: color-mix(in srgb, var(--color-examenes) 90%, var(--color-black));
	}
}

.categoria-icon-grupos {
	background: var(--color-grupos-bg);
	color: var(--color-grupos);
}

.categoria-link-grupo {
	color: var(--color-grupos);
	&:hover {
		color: color-mix(in srgb, var(--color-grupos) 90%, var(--color-black));
	}
}

.categoria-stats {
	grid-column: 2;
	grid-row: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 0.15rem;
}

.stat {
	display: flex;
	align-items: center;
	gap: 0.3rem;
	font-weight: 600;
}

.stat-ok {
	color: var(--color-stat-aciertos);
}

.stat-ko {
	color: var(--color-stat-fallos);
}

.categoria-percent {
	grid-column: 2;
	grid-row: 2;

	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 0.4rem;

	color: var(--color-stat-intentos);
}
</style>
