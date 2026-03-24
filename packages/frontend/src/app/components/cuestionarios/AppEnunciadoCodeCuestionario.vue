<template>
	<div class="pregunta-cabecera">
		<h3 class="pregunta-titulo">
			<span class="pregunta-numero">
				{{ props.indice + 1 }}
			</span>
			<span class="pregunta-texto-intro">
				{{ textoAntes }}
			</span>
		</h3>

		<pre v-if="codigo" class="bloque-codigo">
			<code ref="codeEl">{{ codigo }}</code>
		</pre>

		<p class="pregunta-texto">
			{{ textoDespues }}
		</p>
	</div>
</template>

<script setup lang="ts">
// Importar lenguajes que quieras soportar

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { onMounted, ref } from 'vue';

const props = defineProps<{
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
		hljs.highlightElement(codeEl.value)
	}
})

</script>

<style scoped lang="scss">
$primary-color: #0d6efd;
$text-dark: #212529;

.pregunta-cabecera {
	background-color: white;
	padding: 1.5rem 0 0 1.5rem; // pt-4 pb-0 equivalente
}

.pregunta-titulo {
	display: flex;
	align-items: flex-start;
	font-size: 1.10rem;
	font-weight: 700;
	color: $text-dark;
	margin: 0;
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

.pregunta-texto {
	flex: 1;
}

.bloque-codigo {
	font-size: 0.85rem;
	border-radius: 8px;
	padding: 0.75rem;
	overflow-x: auto;
}

</style>
