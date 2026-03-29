<template>
	<div :id="props.id" class="cuestionario-card">
		<AppEnunciadoCodeCuestionario
			v-if="preguntaLocal"
			:enunciado="preguntaLocal.enunciado"
			:indice="props.indice"
			:estadisticas="preguntaLocal.estadisticas"
		/>

		<div 
			class="respuestas-lista"
			:class="{ 'modo-practica': props.modo === 'practica' }"
		>
			<AppRespuestaCuestionario
				v-for="respuesta in preguntaLocal.respuestas"
				:key="respuesta.enunciado"
				:respuesta="respuesta"
				:respondida="respondida"
				:seleccionada="respuestaSeleccionada"
				:modo="props.modo"
				@seleccionar="verificarRespuesta"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
	Pregunta,
	Respuesta,
	PreguntasApi,
	Configuration,
} from '@preparatai/api-client';
import AppRespuestaCuestionario from './AppRespuestaCuestionario.vue';
import AppEnunciadoCodeCuestionario from './AppEnunciadoCodeCuestionario.vue';

const props = defineProps<{
	pregunta: Pregunta;
	indice: number;
	id: string;
	modo: string;
}>();

const preguntaLocal = reactive({ ...props.pregunta });
const respondida = ref(false);
const respuestaSeleccionada = ref<Respuesta | null>(null);
const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

async function verificarRespuesta(respuesta: Respuesta) {
	if (respondida.value) return;
	respuestaSeleccionada.value = respuesta;
	respondida.value = true;

	// actualizar estadísticas localmente
	preguntaLocal.estadisticas.total++;
	if (respuesta.correcta) {
		preguntaLocal.estadisticas.aciertos++;
	} else {
		preguntaLocal.estadisticas.fallos++;
	}

	// enviar al servidor
	actualizarEstadisticas(respuesta.correcta);

	// bajar a la siguiente pregunta
	scrollToNext();
}

function actualizarEstadisticas(correcta: boolean) {
	api
		.registrarIntentoPregunta({
			id: props.pregunta.id,
			registrarIntentoPreguntaRequest: { acertada: correcta },
		})
		.catch((error) => {
			console.error('Error registrando intento en servidor', error);
		});
}

function scrollToNext() {
	setTimeout(() => {
		const actual = document.getElementById(props.id);

		if (!actual) return;

		const siguiente = actual.nextElementSibling as HTMLElement;

		if (siguiente) {
			siguiente.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, 300);
}
</script>

<style scoped lang="scss">
// Definimos variables de color para que sea fácil de mantener
$border-color: #e2e8f0;
$bg-hover: #f8fafc;

.cuestionario-card {
	background: white;
	border-radius: 0.6rem;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
	scroll-margin-top: 1rem; // o 16px

}

$respuesta-gap: 0.5rem;

.respuestas-lista {
	margin-top: 1rem;
	border: 1px solid $border-color;
	border-radius: 0.5rem;
	overflow: hidden;
	background: white;

	display: flex;
	flex-direction: column;

	&.modo-practica {
		display: grid;
		grid-template-columns: 1fr; // móvil
		gap: $respuesta-gap;
		padding: $respuesta-gap;
	}
}

@media (min-width: 640px) {
	.respuestas-lista.modo-practica {
		grid-template-columns: repeat(2, 1fr);
	}
}

</style>
