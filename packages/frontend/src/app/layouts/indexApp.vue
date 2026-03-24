<template>
	<div id="wrapper">
		<!-- Sidebar fijo -->
		<AppMenu :collapsed="sidebarCollapsed" />

		<!-- Contenido principal -->
		<div id="page-content-wrapper" :class="{ expanded: sidebarCollapsed }">
			<nav class="navbar">
				<div class="navbar-container">
					<button class="btn-toggle" @click="toggleSidebar">
						<i class="fa-solid fa-bars fa-lg"></i>
					</button>
				</div>
			</nav>

			<div class="container-fluid p-4">
				<div class="container py-3">
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AppMenu from '../components/menu/AppMenu.vue';

const sidebarCollapsed = ref(false);

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}
</script>

<style scoped lang="scss">

#wrapper {
	display: flex;
	width: 100%;
	overflow-x: hidden; // evita scroll horizontal
}

/* Sidebar */
.sidebar {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 260px;
	background-color: #1e293b;
	color: white;
	border-right: 1px solid #e5e7eb;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	padding: 1rem 0;
	z-index: 1000; // debajo de navbar si navbar también tiene z-index

	transition: transform 0.3s ease;

	&.collapsed {
		transform: translateX(-100%);
	}
}

/* Contenido principal */
#page-content-wrapper {
	margin-left: 260px; // mismo ancho del sidebar
	width: calc(100% - 260px);
	min-height: 100vh;
	background-color: #f8fafc;
	background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
	background-size: 30px 30px;
	transition: margin-left 0.3s ease, width 0.3s ease;

	&.expanded {
		margin-left: 0;
		width: 100%;
	}
}

/* Navbar */
.navbar {
	position: sticky;
	top: 0;
	z-index: 200; // por encima del contenido
	background-color: #ffffff;
	border-bottom: 1px solid #e5e7eb;
	box-shadow: 0 1px 3px rgba(0,0,0,0.1);
	padding: 0.5rem 1rem;
	display: flex;
	align-items: center;
	height: 4vh;
}

.navbar-container {
	display: flex;
	align-items: center;
	width: 100%;
}

/* Botón toggle */
.btn-toggle {
	background: none;
	border: none;
	color: #6b7280;
	font-size: 1.25rem;
	cursor: pointer;
	display: flex;
	align-items: center;

	&:hover {
		color: #2563eb;
	}
}
</style>