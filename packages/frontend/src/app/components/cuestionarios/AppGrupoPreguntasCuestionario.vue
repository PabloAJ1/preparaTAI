<template>
	<div class="cuestionario-card">
		<div class="pregunta-cabecera">
			<div class="pregunta-main">
				<h5 class="pregunta-titulo">
					<span class="pregunta-numero">{{ props.indice + 1 }}</span>

					<span class="pregunta-texto-intro">{{ props.pregunta.textoPre }}</span>
				</h5>

				<div class="codigo-container">
					<button class="codigo-toggle" @click="mostrarCodigo = !mostrarCodigo">
						{{ mostrarCodigo ? 'Ocultar código' : 'Ver código' }}
					</button>

					<Transition name="codigo">
						<pre v-if="mostrarCodigo" class="bloque-codigo">
							<AppCodeCuestionario :codigo="props.pregunta.codigo" />
						</pre>
					</Transition>
				</div>

				<p class="pregunta-texto-intro">
					{{ props.pregunta.textoPos }}
				</p>
			</div>
		</div>
		<div class="grupo-preguntas">
			<AppPreguntaCuestionario
				v-for="(pregunta, index) in props.pregunta.preguntas"
				:id="'pregunta-' + index"
				:key="pregunta.id"
				:pregunta="pregunta"
				:indice="index"
				:modo="'grupo'"
				:mostrarPreguntas="mostrarPreguntas"
				:autoScroll="autoScroll"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GrupoPreguntasRelacionadas } from '@preparatai/api-client';
import AppCodeCuestionario from './AppCodeCuestionario.vue';
import AppPreguntaCuestionario from './AppPreguntaCuestionario.vue';
import { ref } from 'vue';

const props = defineProps<{
	pregunta: GrupoPreguntasRelacionadas;
	indice: number;
	id: string;
	mostrarPreguntas: boolean;
	autoScroll: boolean;
}>();
const mostrarCodigo = ref(true)

</script>

<style scoped lang="scss">
.cuestionario-card {
	position: relative;
	background: var(--color-cuestionario-bg);
	border-radius: 0.6rem;
	box-shadow: 0 1px 3px var(--shadow-md);
	margin-bottom: 2rem;
	scroll-margin-top: 1rem;
	touch-action: pan-y;
}

.grupo-preguntas {
	margin-top: 1rem;
	padding: 0rem 1.5rem 1.5rem 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.pregunta-texto-intro {
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

.codigo-container {
	margin: 0.5rem 0 1rem 0;
}

.codigo-toggle {
	background: transparent;
	border-radius: 6px;
	font-size: 0.8rem;
	padding: 4px 8px;
	cursor: pointer;
	color: var(--color-text-main);
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
		background-color: var(--color-grupos);
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
