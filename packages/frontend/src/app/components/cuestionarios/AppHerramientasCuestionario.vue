<template>
	<div class="pregunta-tools">
		<div 
			v-if="mostrarWarning" 
			class="tools warning" 
			@click="abrirModalWarning"
		>
			<i class="fa-solid fa-triangle-exclamation"></i>
		</div>

		<div class="tools editar" title="Editar Pregunta" @click="abrirModalEdit">
			<i class="fa-solid fa-pencil" />
		</div>

		<div class="tools descartar" title="Marcar para revisar" @click="revisarPregunta">
			<i class="fa-solid fa-exclamation" />
		</div>

		<div class="tools descartar" title="Descartar" @click="descartarPregunta">
			<i class="fa-solid fa-box-archive"></i>
		</div>
	</div>

	<!-- Modal de edición -->
	<AppEditPreguntaModal 
		:visible="mostrarModalEdit" 
		titulo="Editar" 
		@close="cerrarModalEdit" 
		@save="guardarPregunta"
	>
		<AppEditPreguntaCuestionario 
			v-if="preguntaEditando" 
			:pregunta-editando="preguntaEditando" 
		/>
	</AppEditPreguntaModal>

	<!-- Modal de warning -->
	<AppWarningModal :visible="mostrarModalWarning" titulo="Advertencia" @close="cerrarModalWarning">
		<p>
			Esta pregunta ha sido corregida por una IA o está Marcada para Revisar, 
			toma precauciones a la hora de tomarla como fuente de verdad.
		</p>
		<p>Si crees que está mal, repórtala. Gracias</p>
	</AppWarningModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppWarningModal from './AppWarningModal.vue';
import AppEditPreguntaModal from './AppEditPreguntaModal.vue';
import AppEditPreguntaCuestionario from './AppEditPreguntaCuestionario.vue';
import { Configuration, Pregunta, PreguntasApi } from '@preparatai/api-client';

// Props
const props = defineProps<{
	pregunta: Pregunta;
}>();

const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

// Computed
const mostrarWarning = computed(() => props.pregunta.estado === 'GPT' || props.pregunta.estado === 'Marcado para revisar');

// Warning modal
const mostrarModalWarning = ref(false);
function abrirModalWarning() {
	mostrarModalWarning.value = true;
}
function cerrarModalWarning() {
	mostrarModalWarning.value = false;
}

// Edit modal
const mostrarModalEdit = ref(false);
const preguntaEditando = ref<Pregunta | null>(null);
function abrirModalEdit() {
	// Clonar la pregunta para no modificar la original
	preguntaEditando.value = JSON.parse(JSON.stringify(props.pregunta));
	mostrarModalEdit.value = true;
}
function cerrarModalEdit() {
	mostrarModalEdit.value = false;
	preguntaEditando.value = null;
}

// Emit events
const emit = defineEmits<{
	(e: 'descartar', id: string): void;
	(e: 'revisar', id: string): void;
}>();

function descartarPregunta() {
	emit('descartar', props.pregunta.id);
}

function revisarPregunta() {
	emit('revisar', props.pregunta.id);
}

// Guardar cambios
async function guardarPregunta() {
	if (!preguntaEditando.value) return;
	console.log(preguntaEditando.value);

	await api.updatePreguntaById({
		id: props.pregunta.id,
		pregunta: preguntaEditando.value
	})

	Object.assign(props.pregunta, { ...preguntaEditando.value });
	cerrarModalEdit();
}
</script>

<style lang="scss">
.pregunta-tools {
	display: flex;
	justify-content: flex-start;
	gap: 0.75rem;
	background: transparent;
	padding: 0;
	font-size: 0.75rem;
}

@media (min-width: 640px) {
	.pregunta-tools {
		display: flex;
		flex-direction: row;
		align-content: center;
		gap: 0.35rem;
		border-radius: 8px;
		padding: 0.30rem 0.65rem;
		font-size: 0.80rem;
		min-width: 55px;
		margin-right: 0.5rem;
	}
}

.tools {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-weight: 600;
	cursor: pointer;
	transition: transform 0.15s;

	&.warning {
		color: var(--color-stat-warning);
		margin-left: 0.5rem;
	}

	&.editar {
		color: var(--color-editar-pregunta-agregar);
		margin-left: 0.5rem;
	}

	&.descartar {
		color: var(--color-editar-eliminar-btn);
		margin-left: 0.5rem;
	}

	&:hover {
		transform: scale(1.1);
	}
}


</style>