<template>
	<AppCabeceraCuestionario :nombre="id" :total-preguntas="numeroPreguntas" />

	<TransitionGroup name="fade-slide" tag="div" id="lista-preguntas">
		<AppPreguntaCuestionario
			v-for="(pregunta, index) in listadoPreguntas"
			:key="pregunta.id"
			:id="'pregunta-' + index"
			:pregunta="pregunta"
			:indice="index"
			:modo="modo"
			@descartar="eliminarPregunta" />
	</TransitionGroup>
	<!-- Sentinel separado al final de la página -->
	<div class="sentinel-spacer"></div>
	<div v-if="!finPreguntas" id="sentinel" ref="sentinelRef"></div>

	<div v-if="cargando" class="text-center p-2">Cargando preguntas...</div>
</template>

<script setup lang="ts">
import AppCabeceraCuestionario from '../components/cuestionarios/AppCabeceraCuestionario.vue';
import AppPreguntaCuestionario from '../components/cuestionarios/AppPreguntaCuestionario.vue';
import { useTestAttempt } from '../composables/useTestAttempt';
import { ref, onUnmounted } from 'vue';
import { Configuration, PreguntasApi, Pregunta } from '@preparatai/api-client';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';

const page = ref(1);
const limit = ref(50);
const cargando = ref(false);
let finPreguntas = ref(false);

const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const numeroPreguntas = ref(0);

const { id, modo } = defineProps<{
	id: string;
	modo: string;
}>();

const { getAttempt, clearAttempt } = useTestAttempt(id);
const { seed } = getAttempt();
const listadoPreguntas = ref<Pregunta[]>([]); // inicializamos con array vacío
const sentinelRef = ref<HTMLElement | null>(null);

useInfiniteScroll(cargarPreguntas, sentinelRef);

onUnmounted(() => {
	clearAttempt();
});

async function cargarPreguntas() {
	cargando.value = true;
	try {
		const preguntas = await api.getPreguntasPorCategoria({
			id,
			page: page.value,
			limit: limit.value,
			seed: Number(seed),
		});
		listadoPreguntas.value.push(...preguntas);

		if (preguntas.length < limit.value) finPreguntas.value = true;
		else page.value++;

		numeroPreguntas.value = listadoPreguntas.value.length;
	} catch (error) {
		console.error('Error cargando preguntas:', error);
	} finally {
		cargando.value = false;
	}
}

function eliminarPregunta(id: string) {
	listadoPreguntas.value = listadoPreguntas.value.filter((p) => p.id !== id);
	api.enterrarPregunta({ id: id });
}
</script>

<style scoped>
.sentinel-spacer {
	height: 1px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: all 0.3s ease;
}

.fade-slide-enter-from {
	opacity: 0;
	transform: translateY(10px);
}

.fade-slide-leave-to {
	opacity: 0;
	transform: translateX(-80px);
}

.fade-slide-move {
	transition: transform 0.3s ease;
}
</style>
