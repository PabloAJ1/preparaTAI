<template>
	<div class="hero-dashboard">
		<div class="hero-row">
			<div class="hero-content">
				<h1 class="hero-title">
					Preparador TAI <span class="hero-version">v3.0</span>
				</h1>

				<p class="hero-description">
					Entrenamiento especializado para el Cuerpo de Técnicos Auxiliares de
					Informática de la Administración del Estado.
				</p>

				<p class="hero-description">
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
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

const numeroDePreguntas = ref<number>(0);

onMounted(async () => {
	try {
		numeroDePreguntas.value = await api.getNumeroDePreguntas();
	} catch (error) {
		console.error('Error obteniendo el número de preguntas:', error);
	}
});
</script>

<style scoped lang="scss">
.hero-dashboard {
	background: linear-gradient(135deg, var(--color-cabecera-bg) 0%, var(--color-modal));
	border-radius: 24px;
	padding: 4rem 3rem;
	color: var(--color-cuestionario-bg);
	margin-bottom: 2.5rem;
	box-shadow: 0 20px 25px -5px var(--shadow-md),
		0 10px 10px -5px var(--shadow-sm);
	position: relative;
	overflow: hidden;

	.hero-row {
		display: flex;
		align-items: center;
	}

	.hero-content {
		max-width: 900px;
	}

	.hero-title {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--color-text-main);
	}

	.hero-version {
		color: var(--color-text-versions);
	}

	.hero-description {
		font-size: 1.25rem;
		opacity: 0.75;
		margin-bottom: 0;
		color: var(--color-text-sencondary);
	}

	&::after {
		content: "\f109";
		font-weight: 900;
		position: absolute;
		right: -20px;
		bottom: -40px;
		font-size: 14rem;
		color: var(--overlay-white-sm);
	}
}
</style>