<template>
	<div :id="props.id" class="cuestionario-card">
		<AppEnunciadoCodeCuestionario
			v-if="preguntaLocal"
			:enunciado="preguntaLocal.enunciado"
			:indice="props.indice"
			:estadisticas="preguntaLocal.estadisticas"
			:id-pregunta="pregunta.id"
			:estado="pregunta.estado"
			:modo="modo"
			@descartar="$emit('descartar', $event)"
		/>

		<div
			class="respuestas-lista"
			:class="{ 'modo-practica': props.modo === 'practica' }">
			<AppRespuestaCuestionario
				v-for="respuesta in preguntaLocal.respuestas"
				:key="respuesta.enunciado"
				:respuesta="respuesta"
				:respondida="respondida"
				:seleccionada="respuestaSeleccionada"
				:modo="props.modo"
				:mostrar-correcta="mostrarPreguntas"
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
	mostrarPreguntas: boolean;
	autoScroll: boolean;
}>();

const preguntaLocal = reactive({ ...props.pregunta });
const respondida = ref(false);
const respuestaSeleccionada = ref<Respuesta | null>(null);
const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const emit = defineEmits<{
	(e: 'descartar', id: string): void;
}>();

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
	if (!props.autoScroll) return;
	

	setTimeout(() => {
		// buscar la siguiente tarjeta dentro del contenedor principal
		const tarjetas = Array.from(
			document.querySelectorAll('.cuestionario-card')
		);
		const index = tarjetas.findIndex((el) => el.id === props.id);

		if (index >= 0 && index < tarjetas.length - 1) {
			const siguiente = tarjetas[index + 1] as HTMLElement;
			siguiente.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, 300);
}
</script>

<style scoped lang="scss">
// Definimos variables de color para que sea fácil de mantener
$respuesta-gap: 0.5rem;

.cuestionario-card {
	position: relative;
	background: var(--color-cuestionario-bg);
	border-radius: 0.6rem;
	box-shadow: 0 1px 3px var(--shadow-md);
	margin-bottom: 2rem;
	scroll-margin-top: 1rem;
	touch-action: pan-y;
}

.respuestas-lista {
	margin-top: 1rem;
	border: 1px solid var(--color-border-color-respuesta);
	border-radius: 0.5rem;
	overflow: hidden;
	background: var(--color-cuestionario-bg);

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
