<template>
	<div class="cuestionario-card-wrapper">
		<!-- Overlay gris + texto -->
		<AppSwipeOverlay :progreso="swipeProgress" texto="Enterrar" />

		<div
			:id="props.id"
			class="cuestionario-card"
			:style="cardStyle"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
			@mousedown="onMouseDown"
		>
			<AppEnunciadoCodeCuestionario
				v-if="preguntaLocal"
				:enunciado="preguntaLocal.enunciado"
				:indice="props.indice"
				:estadisticas="preguntaLocal.estadisticas"
				:id-pregunta="pregunta.id"
				:estado="pregunta.estado"
			/>

			<div
				class="respuestas-lista"
				:class="{ 'modo-practica': props.modo === 'practica' }"
				:style="{ pointerEvents: isSwiping ? 'none' : 'auto' }"
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
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import {
	Pregunta,
	Respuesta,
	PreguntasApi,
	Configuration,
} from '@preparatai/api-client';
import AppRespuestaCuestionario from './AppRespuestaCuestionario.vue';
import AppEnunciadoCodeCuestionario from './AppEnunciadoCodeCuestionario.vue';
import AppSwipeOverlay from './AppSwipeOverlay.vue';

const props = defineProps<{
	pregunta: Pregunta;
	indice: number;
	id: string;
	modo: string;
}>();

const emit = defineEmits<{
	(e: 'descartar', id: string): void;
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
		const wrapper = document.getElementById(props.id)?.parentElement;
		if (!wrapper) return;

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

const offsetX = ref(0);
const startX = ref(0);
const dragging = ref(false);
const SWIPE_THRESHOLD = 320;
const isSwiping = computed(() => Math.abs(offsetX.value) > 12);

// Computamos progreso del swipe hacia izquierda (0 a -1)
const swipeProgress = computed(() => {
	if (offsetX.value < 0) {
		const p = offsetX.value / SWIPE_THRESHOLD;
		return p < -1 ? -1 : p;
	}
	return 0;
});

// Estilo dinámico de la tarjeta según swipe
const cardStyle = computed(() => ({
	transform: `translateX(${offsetX.value}px)`,
	opacity: 1 - Math.min(-swipeProgress.value * 0.2, 0.2),
	transition: dragging.value
		? 'none'
		: 'transform 0.2s ease, opacity 0.2s ease',
}));

// --- Drag / Swipe ---
function startDrag(x: number) {
	startX.value = x;
	dragging.value = true;
}
function moveDrag(x: number) {
	if (!dragging.value) return;
	offsetX.value = x - startX.value;
}
function endDrag() {
	if (!dragging.value) return;
	dragging.value = false;
	if (offsetX.value < -SWIPE_THRESHOLD) descartarPregunta();
	else offsetX.value = 0;
}
function onTouchStart(e: TouchEvent) {
	startDrag(e.touches[0].clientX);
}
function onTouchMove(e: TouchEvent) {
	moveDrag(e.touches[0].clientX);
}
function onTouchEnd() {
	endDrag();
}
function onMouseDown(e: MouseEvent) {
	startDrag(e.clientX);
	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('mouseup', onMouseUp);
}
function onMouseMove(e: MouseEvent) {
	moveDrag(e.clientX);
}
function onMouseUp() {
	endDrag();
	window.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('mouseup', onMouseUp);
}

function descartarPregunta() {
	offsetX.value = offsetX.value > 0 ? 500 : -500;
	setTimeout(() => emit('descartar', props.pregunta.id), 200);
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

.cuestionario-card-wrapper {
	position: relative;
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

.pregunta-card-inner {
	transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
