<template>
	<section class="admin-page">
		<h1 class="admin-title">Panel de Administración</h1>

		<div class="admin-cards">
			<!-- Reiniciar estadísticas -->
			<div class="admin-card" @click="reiniciarEstadisticas">
				<i class="fa-solid fa-rotate-right"></i>
				<p>Reiniciar estadísticas</p>
			</div>

			<!-- Backup de la base de datos -->
			<div class="admin-card" @click="backupDatabase">
				<i class="fa-solid fa-database"></i>
				<p>Backup de la base de datos</p>
			</div>

			<!-- Cargar preguntas desde un fichero -->
			<div class="admin-card file-upload">
				<i class="fa-solid fa-file-import"></i>
				<p>Cargar preguntas</p>
				<input type="file" @change="cargarPreguntas" accept=".json,.csv" />
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { Configuration, PreguntasApi } from '@preparatai/api-client';

const reiniciarEstadisticas = async () => {
	const api = new PreguntasApi(
		new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
	);
	await api.reiniciarContadorDeEstadisticas();
};

const backupDatabase = () => {
	console.log('Haciendo backup de la base de datos...');
	// Aquí iría la llamada al backend
};

const cargarPreguntas = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (!target.files?.length) return;
	const file = target.files[0];
	console.log('Cargando preguntas desde:', file.name);
	// Aquí iría la lógica para leer el archivo y enviar al backend
};
</script>

<style lang="scss" scoped>
.admin-page {
	padding: 2rem;
	background-color: #f0f2f5;
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
			background-color: #fff;
			border-radius: 0.75rem;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
				color: #4a90e2;
			}

			p {
				font-weight: 600;
				color: #333;
			}

			&:hover {
				transform: translateY(-5px);
				box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
			}

			&.file-upload input[type='file'] {
				display: none;
			}
		}
	}
}
</style>
