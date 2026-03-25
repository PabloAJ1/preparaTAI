<template>
	<div class="pregunta-cabecera">
		<div class="pregunta-main">
			<h5 class="pregunta-titulo">
				<span class="pregunta-numero">
					{{ props.indice + 1 }}
				</span>
				<span class="pregunta-texto-intro">
					{{ textoAntes }}
				</span>
			</h5>

			<pre v-if="codigo" class="bloque-codigo">
				<code ref="codeEl">{{ codigo }}</code>
			</pre>

			<p class="pregunta-texto">
				{{ textoDespues }}
			</p>
		</div>

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
	</div>
</template>

<script setup lang="ts">
// Importar lenguajes que quieras soportar

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { onMounted, ref } from 'vue';
import type { Estadistica } from '@preparatai/api-client';

const props = defineProps<{
	estadisticas: Estadistica;
	enunciado: string;
	indice: number;
}>();

const partes = props.enunciado.split(/<code>([\s\S]*?)<\/code>/);
const textoAntes = partes[0].trim();
const codigo = partes[1]?.trim() || '';
const textoDespues = partes[2]?.trim() || '';

const codeEl = ref<HTMLElement>();

onMounted(() => {
	if (codeEl.value) {
		hljs.highlightElement(codeEl.value);
	}
});

</script>

<style scoped lang="scss">
$primary-color: #0d6efd;
$text-dark: #212529;

.pregunta-texto-intro {
	//Recuerda! El texto justificado no es bueno para la dixlesia (pregunta de examen...)
	text-align: justify;
}

.pregunta-numero { 
	background-color: $primary-color; 
	color: white; 
	padding: 0.35rem 0.65rem; 
	font-size: 0.85rem; 
	font-weight: 700; 
	border-radius: 0.375rem; 
	margin-right: 1rem; 
	line-height: 1; 
}

.pregunta-cabecera {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;

	background-color: white;
	padding: 1.5rem 0 0 1.5rem;
}

.pregunta-main {
	flex: 1;
}

.pregunta-titulo {
	display: flex;
	align-items: flex-start;
	font-size: 1.10rem;
	font-weight: 700;
	color: $text-dark;
	margin: 0;
}

.pregunta-stats {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 0.35rem;

	background: #f8f9fa;
	border-radius: 8px;
	padding: 0.1rem 0.65rem;
	font-size: 0.65rem;
	min-width: 55px;

	margin-right: 0.5rem;
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
	color: #198754;
}

.stat.fallos {
	color: #dc3545;
}

.stat.total {
	color: #6c757d;
}

.bloque-codigo {
	font-size: 0.85rem;
	border-radius: 8px;
	padding: 0.75rem;
	overflow-x: auto;
}

</style>