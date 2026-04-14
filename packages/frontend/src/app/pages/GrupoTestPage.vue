<template>
	<AppCabeceraCuestionario 
		:idCategoria="id" 
		:total-preguntas="numeroPreguntas" 
		:modo="'grupo'" 
		@toggle-mostrar-preguntas="handleToggleMostrarPreguntas"
	/>
			
	<AppGrupoPreguntasCuestionario
		v-for="(pregunta, index) in listadoPreguntas"
		:id="'pregunta-' + index"
		:key="pregunta.id"
		:pregunta="pregunta"
		:indice="index"
		:mostrar-preguntas="mostrarPreguntas"
		:auto-scroll="false"
		@descartar="eliminarPregunta" 
	/>
</template>

<script setup lang="ts">
import AppCabeceraCuestionario from '../components/cuestionarios/AppCabeceraCuestionario.vue';
import { ref, onMounted } from 'vue';
import { Configuration, GruposDePreguntasRelacionadasApi, GrupoPreguntasRelacionadas } from '@preparatai/api-client';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';
import AppGrupoPreguntasCuestionario from '../components/cuestionarios/AppGrupoPreguntasCuestionario.vue';

const page = ref(1);
const limit = ref(50);
const cargando = ref(false);
let finPreguntas = ref(false);

const api = new GruposDePreguntasRelacionadasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const numeroPreguntas = ref(0);

const { id } = defineProps<{
	id: string;
}>();

const listadoPreguntas = ref<GrupoPreguntasRelacionadas[]>([]); // inicializamos con array vacío
const sentinelRef = ref<HTMLElement | null>(null);
const mostrarPreguntas = ref(true)

function handleToggleMostrarPreguntas(valor: boolean) {
	mostrarPreguntas.value = valor
}

useInfiniteScroll(cargarPreguntas, sentinelRef);

onMounted(async () => {
	cargarPreguntas()
	mostrarPreguntas.value =
		localStorage.getItem("mostrarPreguntas") !== "false"
})

async function cargarPreguntas() {
	cargando.value = true;
	try {
		const grupoPreguntas = await api.getAllGruposPreguntasByCategoria({
			id
		});
		listadoPreguntas.value.push(...grupoPreguntas);

		if (grupoPreguntas.length < limit.value) finPreguntas.value = true;
		else page.value++;

		numeroPreguntas.value = listadoPreguntas.value.length;
	} catch (error) {
		console.error('Error cargando preguntas:', error);
	} finally {
		cargando.value = false;
	}
}

function eliminarPregunta(){}

</script>
