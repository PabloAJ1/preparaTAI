<template>
	<AppCabeceraCuestionario 
		:nombre-categoria="nombreCategoria" 
		:total-preguntas="numeroPreguntas" 
		:modo="modo" 
		@toggle-mostrar-preguntas="handleToggleMostrarPreguntas"
		@toggle-auto-scroll="handleToggleAutoScroll"
	/>

	<TransitionGroup name="fade-slide" tag="div" id="lista-preguntas">
		<AppPreguntaCuestionario
			v-for="(pregunta, index) in listadoPreguntas"
			:id="'pregunta-' + index"
			:key="pregunta.id"
			:pregunta="pregunta"
			:indice="index"
			:modo="modo"
			:mostrar-preguntas="mostrarPreguntas"
			:auto-scroll="autoScroll"
			@descartar="eliminarPregunta" 
			@revisar="marcarParaRevisar" 
		/>
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
import { ref, onUnmounted, onMounted } from 'vue';
import { Configuration, PreguntasApi, Pregunta, PracticasApi } from '@preparatai/api-client';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';

const page = ref(1);
const limit = ref(50);
const cargando = ref(false);
let finPreguntas = ref(false);

const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const apiPracticas = new PracticasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const numeroPreguntas = ref(0);
const nombreCategoria = ref('');

const { id, modo } = defineProps<{
	id: string;
	modo: string;
}>();

const { getAttempt, clearAttempt } = useTestAttempt(id);
const { seed } = getAttempt();
const listadoPreguntas = ref<Pregunta[]>([]); // inicializamos con array vacío
const sentinelRef = ref<HTMLElement | null>(null);
const mostrarPreguntas = ref(true)
const autoScroll = ref(true)

function handleToggleMostrarPreguntas(valor: boolean) {
	mostrarPreguntas.value = valor
}

function handleToggleAutoScroll(valor: boolean) {
	autoScroll.value = valor
}

useInfiniteScroll(cargarPreguntas, sentinelRef);

onMounted(async () => {
	// cargar preferencias
	mostrarPreguntas.value =
		localStorage.getItem("mostrarPreguntas") !== "false"

	autoScroll.value =
		localStorage.getItem("autoScroll") !== "false"
})

onUnmounted(() => {
	clearAttempt();
});

async function cargarPreguntas() {
	cargando.value = true;
	try {
		let preguntas: Pregunta[] = [];
		if(modo === "practica"){
			const practica = await apiPracticas.getPracticaById({
				id,
				page: page.value,
				limit: limit.value,
				seed: Number(seed),
			});
			preguntas = practica.preguntas
			nombreCategoria.value = practica.nombrePractica
		} else {
			preguntas = await api.getPreguntasPorCategoria({
				id,
				page: page.value,
				limit: limit.value,
				seed: Number(seed),
			});
			nombreCategoria.value = preguntas?.[0].categorias?.[0].nombre ?? id
		}
		
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

function marcarParaRevisar(id: string) {
	listadoPreguntas.value = listadoPreguntas.value.filter((p) => p.id !== id);
	api.marcarParaRevisar({ id: id });
}

</script>

<style scoped>
.sentinel-spacer {
	height: 1px;
}
</style>
