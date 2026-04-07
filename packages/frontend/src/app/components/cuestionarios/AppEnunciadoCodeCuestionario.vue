<template>
	<div class="pregunta-cabecera">
		<div class="pregunta-main">
			<h5 class="pregunta-titulo">
				<span class="pregunta-numero" :class="colorNumero">{{ props.indice + 1 }}</span>

				<template v-if="editando">
					<div class="pregunta-texto-intro bloque-editor">
						<AppEnunciadoEditable
							v-model="textoEditado"
							@guardar="guardarEnunciado"
							@cancelar="cancelarEdicion" />
					</div>
				</template>

				<template v-else>
					<span class="pregunta-texto-intro">{{ textoAntes }}</span>
				</template>

				<button
					v-if="mostrarBotonEditar && !editando"
					class="btn-editar"
					title="Editar enunciado"
					@click="modoEditar">
					✏️
				</button>
			</h5>

			<pre v-if="codigo" class="bloque-codigo">
				<AppCodeCuestionario :codigo="codigo" />
			</pre>

			<p class="pregunta-texto">
				{{ textoDespues }}
			</p>
		</div>

		<AppEstadisticasCuestionario
			:estadisticas="props.estadisticas"
			:estado="props.estado"
			:id-pregunta="props.idPregunta"
			@descartar="$emit('descartar', props.idPregunta);"
		/>
	</div>
</template>

<script setup lang="ts">
import AppEnunciadoEditable from './AppEnunciadoEditable.vue';
import { computed, nextTick, onMounted, ref } from 'vue';
import {
	Configuration,
	PreguntasApi,
	type Estadistica,
} from '@preparatai/api-client';
import AppEstadisticasCuestionario from './AppEstadisticasCuestionario.vue';
import AppCodeCuestionario from './AppCodeCuestionario.vue';

const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);
const props = defineProps<{
	estadisticas: Estadistica;
	enunciado: string;
	indice: number;
	idPregunta: string;
	estado: string;
	modo: string;
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
const textareaEl = ref<HTMLTextAreaElement>();

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
