<template>
	<div class="pregunta-cabecera">
		<div class="pregunta-main">
			<h5 class="pregunta-titulo">
				<span class="pregunta-numero" :class="colorNumero">{{ props.indice + 1 }}</span>
				<span class="pregunta-texto-intro">{{ pregunta.enunciado }}</span>
			</h5>

			<pre v-if="pregunta.codigo" class="bloque-codigo">
				<AppCodeCuestionario :codigo="pregunta.codigo" />
			</pre>
		</div>

		<AppEstadisticasCuestionario
			:estadisticas="props.pregunta.estadisticas"
		/>

		<AppHerramientasCuestionario
			:pregunta="props.pregunta"
			@descartar="$emit('descartar', props.pregunta.id);"
			@revisar="$emit('revisar', props.pregunta.id);"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
	Pregunta,
} from '@preparatai/api-client';
import AppEstadisticasCuestionario from './AppEstadisticasCuestionario.vue';
import AppCodeCuestionario from './AppCodeCuestionario.vue';
import AppHerramientasCuestionario from './AppHerramientasCuestionario.vue';

const props = defineProps<{
	pregunta: Pregunta
	indice: number;
	modo: string;
}>();
const colorNumero = computed(() => ({
	'tema-color-repaso': props.modo === 'repaso',
	'tema-color-practica': props.modo === 'practica',
	'tema-color-examen': props.modo === 'examen',
	'tema-color-grupo': props.modo === 'grupo',
}));
</script>

<style scoped lang="scss">
.pregunta-texto-intro {
	text-align: left;
	line-height: 1.4;
	color: var(--color-text-main);
}

.pregunta-texto {
	text-align: left;
	line-height: 1.4;
	color: var(--color-text-main);
}

.pregunta-numero {
	display: none;
}

.pregunta-cabecera {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	padding: 1rem;
}

.pregunta-main {
	flex: 1;
}

.pregunta-titulo {
	display: flex;
	align-items: flex-start;
	font-size: 1rem;
	font-weight: 700;
	color: var(--color-texto-enunciado);
	margin: 0;
}

@media (min-width: 640px) {
	.pregunta-numero {
		display: inline-block;
		color: var(--color-white);
		padding: 0.35rem 0.65rem;
		font-size: 0.85rem;
		font-weight: 700;
		border-radius: 0.375rem;
		margin-right: 1rem;
		line-height: 1;
	}

	.tema-color-repaso {
		background-color: var(--color-cabecera-repaso);
	}
	.tema-color-examen {
		background-color: var(--color-cabecera-examen);
	}
	.tema-color-practica {
		background-color: var(--color-cabecera-practica);
	}
	.tema-color-grupo {
		background-color: var(--color-cabecera-grupo);
	}

	.pregunta-cabecera {
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		padding: 1.5rem 0 0 1.5rem;
	}
}

.bloque-codigo {
	font-size: 0.85rem;
	border-radius: 8px;
	padding: 0.75rem;
	overflow-x: auto;
}
</style>
