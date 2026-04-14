<template>
	<div class="cuestionario-header" :class="cabeceraStyle">
		<h2 class="cuestionario-titulo">
			<i class="fa-solid fa-clipboard-question cuestionario-icono" />
			{{ nombreCategoria }}
		</h2>

		<div class="cuestionario-actions">
			<button 
				class="header-btn" 
				@click="toggleMostrarPreguntas" 
				title="Activar / Desactivar respuesta correcta"
			>
				<i :class="mostrarPreguntas 
					? 'fa-solid fa-eye' 
					: 'fa-solid fa-eye-slash'" 
				/>
			</button>

			<button 
				class="header-btn" 
				@click="toggleAutoScroll" 
				title="Activar / Desactivar desplazamiento automatico"
			>
				<i :class="autoScroll 
					? 'fa-solid fa-angles-down' 
					: 'fa-solid fa-ban'" 
				/>
			</button>

			<span class="cuestionario-contador">
				{{ props.totalPreguntas }} Preguntas
			</span>

		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
	nombreCategoria: string;
	modo: string;
	totalPreguntas: number;
}>();

onMounted(async () => {
	// cargar preferencias
	mostrarPreguntas.value =
		localStorage.getItem("mostrarPreguntas") !== "false"

	autoScroll.value =
		localStorage.getItem("autoScroll") !== "false"
})

const emit = defineEmits<{
	(e: 'toggleMostrarPreguntas', value: boolean): void
	(e: 'toggleAutoScroll', value: boolean): void
}>()

const mostrarPreguntas = ref(true)
const autoScroll = ref(true)


const cabeceraStyle = computed(() => ({
	'titulo-repaso': props.modo === 'repaso',
	'titulo-practica': props.modo === 'practica',
	'titulo-examen': props.modo === 'examen',
	'titulo-grupo': props.modo === 'grupo',
}));

function toggleMostrarPreguntas() {
	mostrarPreguntas.value = !mostrarPreguntas.value
	localStorage.setItem("mostrarPreguntas", String(mostrarPreguntas.value))
	emit("toggleMostrarPreguntas", mostrarPreguntas.value)
}

function toggleAutoScroll() {
	autoScroll.value = !autoScroll.value
	localStorage.setItem("autoScroll", String(autoScroll.value))
	emit("toggleAutoScroll", autoScroll.value)
}

</script>

<style scoped lang="scss">
.cuestionario-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
}

.cuestionario-titulo {
	font-weight: 700;
	font-size: 2rem;
	margin: 0;
	display: flex;
	align-items: center;
}

.cuestionario-icono {
	margin-right: 0.75rem;
}

.cuestionario-contador {
	background-color: var(--color-cards-bg);
	color: var(--color-text-tertiary);
	padding: 0.5rem 1rem;
	font-size: 1rem;
	font-weight: 600;
	border-radius: 50rem; // rounded-pill
}

.titulo-repaso {
	color: var(--color-cabecera-repaso);
}
.titulo-examen {
	color: var(--color-cabecera-examen);
}
.titulo-practica {
	color: var(--color-cabecera-practica);
}
.titulo-grupo {
	color: var(--color-cabecera-grupo);
}

.cuestionario-actions {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.header-btn {
	border: none;
	background: var(--color-cards-bg);
	color: var(--color-text-tertiary);
	width: 36px;
	height: 36px;
	border-radius: 0.5rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;

	&:hover {
		background: var(--color-cuestionario-bg-hover);
		transform: translateY(-1px);
	}
}
</style>
