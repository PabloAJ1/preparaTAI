<template>
	<div class="hero-dashboard shadow">
		<div class="row align-items-center">
			<div class="col-lg-8">
				<h1 class="display-5 fw-bold mb-3">
					Preparador TAI <span class="text-info">v3.0</span>
				</h1>
				<p class="lead opacity-75 mb-0">
					Entrenamiento especializado para el Cuerpo de Técnicos Auxiliares de
					Informática de la Administración del Estado.
				</p>
				<p class="lead opacity-75 mb-0">
					Preguntas actuales: {{ numeroDePreguntas }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PreguntasApi, Configuration } from '@preparatai/api-client';
const api = new PreguntasApi(
	new Configuration({ basePath: 'http://localhost:3000/api' })
);

const numeroDePreguntas = ref<number>(0);

onMounted(async () => {
	try {
		console.log('1');
		numeroDePreguntas.value = await api.getNumeroDePreguntas();
		console.log('2');
	} catch (error) {
		console.error('Error obteniendo el número de preguntas:', error);
	}
});
</script>

<style scoped>
/* Hero Section con degradado profesional */
.hero-dashboard {
	background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
	border-radius: 24px;
	padding: 4rem 3rem;
	color: white;
	margin-bottom: 2.5rem;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	position: relative;
	overflow: hidden;
}

.hero-dashboard::after {
	content: '\f109'; /* Icono de laptop code */
	font-family: 'Font Awesome 6 Free';
	font-weight: 900;
	position: absolute;
	right: -20px;
	bottom: -40px;
	font-size: 14rem;
	color: rgba(255, 255, 255, 0.05);
}
</style>
