<template>
	<div class="cuestionario-header">
		<h2 class="cuestionario-titulo">
			<i class="fa-solid fa-clipboard-question cuestionario-icono" />
			{{ props.nombre }}
		</h2>

		<span class="cuestionario-contador">
			{{ props.totalPreguntas }} Preguntas
		</span>
	</div>
</template>

<script setup lang="ts">
// 🟢 Corregido para guardar en 'props' y mantener reactividad
const props = defineProps<{
	nombre: string;
	totalPreguntas: number;
}>();
</script>

<style scoped lang="scss">
$primary-color: #0d6efd;
$secondary-color: #6c757d;

.cuestionario-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem; // mb-4 equivalente
}

.cuestionario-titulo {
	color: $primary-color;
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
	background-color: $secondary-color;
	color: white;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	font-weight: 600;
	border-radius: 50rem; // rounded-pill
}
</style>
