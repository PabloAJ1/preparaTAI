<template>
	<section class="admin-page">
		<h1 class="admin-title">Panel de Administración</h1>

		<div class="admin-cards">
			<!-- Reiniciar estadísticas -->
			<div class="admin-card" @click="reiniciarEstadisticas">
				<i class="fa-solid fa-rotate-right"></i>
				<p>Reiniciar estadísticas</p>
			</div>
			<!-- Desenterrar preguntas -->
			<div class="admin-card" @click="desenterrarPreguntas">
				<i class="fa-solid fa-arrow-up-from-ground-water"></i>
				<p>Desenterrar preguntas</p>
			</div>

			<!-- Inicializar DB -->
			<div class="admin-card file-upload" @click="confirmarInicializacion">
				<i class="fa-solid fa-cloud-arrow-down"></i>
				<p>Inicializar DB</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { AdminApi, Configuration, PreguntasApi } from '@preparatai/api-client';

const reiniciarEstadisticas = async () => {
	const api = new PreguntasApi(
		new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
	);
	await api.reiniciarContadorDeEstadisticas();
};

const desenterrarPreguntas = async () => {
	const api = new PreguntasApi(
		new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
	);
	await api.desenterrarTodasLasPreguntas();
};

const inicializarDB = async () => {
	const api = new AdminApi(
		new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
	);
	await api.inicializarDB();
};

function confirmarInicializacion() {
  const confirmado = window.confirm("¿Estás seguro de que quieres inicializar la base de datos? Esta acción borrara todos los datos y no se puede deshacer.");
  if (confirmado) {
    inicializarDB();
  }
}

</script>

<style lang="scss" scoped>
.admin-page {
	padding: 2rem;
	background-color: var(--color-main-bg);
	min-height: 100vh;

	.admin-title {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
		color: #333;
	}

	.admin-cards {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
		justify-content: center;

		.admin-card {
			background-color: var(--color-white);
			border-radius: 0.75rem;
			box-shadow: 0 4px 12px var(--shadow-md);
			width: 200px;
			height: 200px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			cursor: pointer;
			transition: transform 0.2s, box-shadow 0.2s;

			i {
				font-size: 2.5rem;
				margin-bottom: 1rem;
				color: var(--color-admin-icons);
			}

			p {
				font-weight: 600;
				color: var(--color-smoke)
			}

			&:hover {
				transform: translateY(-5px);
				box-shadow: 0 8px 20px var(--shadow-md);
			}

			&.file-upload input[type='file'] {
				display: none;
			}
		}
	}
}
</style>
