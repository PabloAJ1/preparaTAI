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

		<div
			v-if="mostrarWarning"
			class="stat warning"
			@click="abrirModalWarning">
			<span class="valor">⚠️</span>
		</div>
		<div
			class="stat descartar"
			@click="descartarPregunta"
			title="Descartar / Marcar para revisar">
			<span class="valor">❗</span>
		</div>
	</div>

	<AppWarningModal
		:visible="mostrarModalWarning"
		titulo="Advertencia"
		@close="cerrarModalWarning">
		<p>
			Esta pregunta ha sido corregida por una IA, toma precauciones a la hora de
			tomarla como funete de verdad.
		</p>
		<p>Si crees que está mal, reportala. Gracias</p>
	</AppWarningModal>
</template>

<script setup lang="ts">
import { Estadistica } from '@preparatai/api-client';
import AppWarningModal from './AppWarningModal.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
	estadisticas: Estadistica;
	estado: string;
	idPregunta: string;
}>();

const mostrarWarning = computed(() => {
	return props.estado === 'GPT';
});

const mostrarModalWarning = ref(false);

function abrirModalWarning() {
	mostrarModalWarning.value = true;
}

function cerrarModalWarning() {
	mostrarModalWarning.value = false;
}

const emit = defineEmits<{
	(e: 'descartar', id: string): void;
}>();

function descartarPregunta() {
	emit('descartar', props.idPregunta);
}
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

.stat.warning {
	color: var(--color-stat-warning);
	margin-left: 0.5rem;
	cursor: pointer;
}

.stat.descartar {
	color: var(--color-stat-warning); // o rojo si quieres peligro
	cursor: pointer;
	margin-left: 0.25rem;
}

.stat.descartar:hover {
	transform: scale(1.1);
}
</style>