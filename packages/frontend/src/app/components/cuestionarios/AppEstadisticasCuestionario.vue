<template>
	<div class="pregunta-stats">
		<div class="stat aciertos">
			<span class="valor">{{ props.estadisticas.aciertos }}</span>
			<span class="label">✔</span>
		</div>

		<div class="stat fallos">
			<span class="valor">{{ props.estadisticas.fallos }}</span>
			<span class="label">✖</span>
		</div>

		<div class="stat total">
			<span class="valor">{{ props.estadisticas.total }}</span>
			<span class="label">int.</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Estadistica } from '@preparatai/api-client';

const props = defineProps<{
	estadisticas: Estadistica;
}>();
</script>

<style lang="scss">
.pregunta-stats {
	display: flex;
	justify-content: flex-start;
	gap: 0.75rem;

	background: transparent;
	padding: 0;
	font-size: 0.75rem;
}

@media (min-width: 640px) {
	.pregunta-stats {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 0.35rem;
		border-radius: 8px;
		padding: 0.1rem 0.65rem;
		font-size: 0.65rem;
		min-width: 55px;

		margin-right: 0.5rem;
	}
}

.stat {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-weight: 600;
}

.stat .valor {
	font-size: 0.85rem;
}

.stat.aciertos {
	color: var(--color-stat-aciertos);
}

.stat.fallos {
	color: var(--color-stat-fallos);
}

.stat.total {
	color: var(--color-stat-intentos);
}
</style>