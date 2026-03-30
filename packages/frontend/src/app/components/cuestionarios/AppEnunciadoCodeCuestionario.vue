<template>
	<div class="pregunta-cabecera">
		<div class="pregunta-main">
			<h5 class="pregunta-titulo">
				<span class="pregunta-numero">{{ props.indice + 1 }}</span>

				<!--
				/**
				Esto de momento es parar ir perfilando las preguntas, de cara al futuro se eliminará 
				y la edicion de preguntas la haremos desde su propio apartado

				El codigo original es este:
				<span class="pregunta-texto-intro"> {{ textoAntes }} </span>
				*/
				-->
				<template v-if="editando">
					<div class="pregunta-texto-intro bloque-editor">
						<AppEnunciadoEditable
							v-model="textoEditado"
							@guardar="guardarEnunciado"
							@cancelar="cancelarEdicion"
						/>
					</div>
				</template>

				<template v-else>
					<span class="pregunta-texto-intro">{{ textoAntes }}</span>
				</template>

				<button
					v-if="mostrarBotonEditar && !editando"
					class="btn-editar"
					title="Editar enunciado"
					@click="modoEditar"
				>
					✏️
				</button>
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

			<div class="stat warning" v-if="mostrarWarning">
				<span class="valor">⚠️</span>				
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppEnunciadoEditable from './AppEnunciadoEditable.vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { computed, nextTick, onMounted, ref } from 'vue';
import {
	Configuration,
	PreguntasApi,
	type Estadistica,
} from '@preparatai/api-client';

const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);
const props = defineProps<{
	estadisticas: Estadistica;
	enunciado: string;
	indice: number;
	idPregunta: string;
	estado: string;
}>();

const mostrarBotonEditar = ref(false);
const editando = ref(false);
const textoEditado = ref(props.enunciado);
const partes = props.enunciado.split(/<code>([\s\S]*?)<\/code>/);
const textoAntes = ref(partes[0].trim());
const codigo = partes[1]?.trim() || '';
const textoDespues = partes[2]?.trim() || '';
const checkPantallaGrande = () => {
	mostrarBotonEditar.value = window.innerWidth >= 1024; // puedes ajustar a tu breakpoint
};
const codeEl = ref<HTMLElement>();
const textareaEl = ref<HTMLTextAreaElement>();

const mostrarWarning = computed(() => {
	console.log(props.estado);
	return props.estado === 'GPT';
});

onMounted(() => {
	if (codeEl.value) {
		hljs.highlightElement(codeEl.value);
	}
});

onMounted(() => {
	checkPantallaGrande();
	window.addEventListener('resize', checkPantallaGrande);
});

const modoEditar = async () => {
	editando.value = true;
	await nextTick();
	textareaEl.value?.focus();
};

const guardarEnunciado = async () => {
	try {
		await api.updatePreguntaById({
			id: props.idPregunta,
			preguntaUpdate: { enunciado: textoEditado.value },
		});
		editando.value = false;
		textoAntes.value = textoEditado.value;
	} catch (error) {
		console.error('Error al actualizar:', error);
		textoEditado.value = props.enunciado;
		editando.value = false;
	}
};

const cancelarEdicion = () => {
	textoEditado.value = textoAntes.value;
	editando.value = false;
};
</script>

<style scoped lang="scss">
$primary-color: #0d6efd;
$text-dark: #212529;

.pregunta-texto-intro {
	text-align: left;
	line-height: 1.4;
}

.pregunta-numero {
	display: none;
}

@media (min-width: 640px) {
	.pregunta-numero {
		display: inline-block;
		background-color: $primary-color;
		color: white;
		padding: 0.35rem 0.65rem;
		font-size: 0.85rem;
		font-weight: 700;
		border-radius: 0.375rem;
		margin-right: 1rem;
		line-height: 1;
	}
}

.pregunta-cabecera {
	display: flex;
	flex-direction: column; // 👈 mobile first
	gap: 0.75rem;

	background-color: white;
	padding: 1rem;
}

.pregunta-stats {
	display: flex;
	justify-content: flex-start;
	gap: 0.75rem;

	background: transparent;
	padding: 0;
	font-size: 0.75rem;
}

@media (min-width: 640px) {
	.pregunta-cabecera {
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		padding: 1.5rem 0 0 1.5rem;
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
}

.pregunta-main {
	flex: 1;
}

.pregunta-titulo {
	display: flex;
	align-items: flex-start;
	font-size: 1rem;
	font-weight: 700;
	color: $text-dark;
	margin: 0;
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

.stat.warning {
	color: #f59e0b;
	margin-left: .5rem;
}

.bloque-editor {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.bloque-codigo {
	font-size: 0.85rem;
	border-radius: 8px;
	padding: 0.75rem;
	overflow-x: auto;
}

.btn-editar {
	font-size: 0.8rem;
	padding: 0.2rem 0.4rem;
	cursor: pointer;
	border: none;
	background: transparent;
}

/* Solo en pantallas grandes */
@media (max-width: 1023px) {
	.btn-editar {
		display: none;
	}
}
</style>
