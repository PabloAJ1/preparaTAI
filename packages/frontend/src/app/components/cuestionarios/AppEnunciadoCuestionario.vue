<template>
	<div class="pregunta-cabecera">
		<h3 class="pregunta-titulo">
			<span class="pregunta-numero">
				{{ props.indice + 1 }}
			</span>
			<span class="pregunta-texto">
				{{ props.enunciado }}
			</span>
		</h3>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	enunciado: string;
	indice: number;
}>();
</script>

<style scoped lang="scss">
$primary-color: #0d6efd;
$text-dark: #212529;

.pregunta-cabecera {
	background-color: white;
	padding: 1.5rem 0 0 1.5rem; // pt-4 pb-0 equivalente
}

.pregunta-titulo {
	display: flex;
	align-items: flex-start;
	font-size: 1.10rem;
	font-weight: 700;
	color: $text-dark;
	margin: 0;
}

.pregunta-numero {
	background-color: $primary-color;
	color: white;
	padding: 0.35rem 0.65rem;
	font-size: 0.85rem;
	font-weight: 700;
	border-radius: 0.375rem;
	margin-right: 1rem;
	line-height: 1;
}

.pregunta-texto {
	flex: 1;
}
</style>
