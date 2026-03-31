<template>
	<div id="wrapper">
		<!-- Sidebar fijo -->
		<AppMenu :collapsed="sidebarCollapsed" />

		<!-- 👇 OVERLAY AQUÍ -->
		<div 
			v-if="!sidebarCollapsed"
			class="overlay"
			@click="toggleSidebar"
		/>

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppMenu from '../components/menu/AppMenu.vue';

const sidebarCollapsed = ref(window.innerWidth < 768);

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}

const router = useRouter();

onMounted(() => {
  router.afterEach(() => {
    if (window.innerWidth < 768) {
      sidebarCollapsed.value = true;
    }
  });
});
</script>

<style scoped lang="scss">

#wrapper {
	display: flex;
	width: 100%;
	overflow-x: hidden; // evita scroll horizontal
}

#page-content-wrapper {
	width: 100%;
	min-height: 100vh;
	transition: all 0.3s ease;
}

/* en escritorio deja espacio al sidebar */
@media (min-width: 768px) {
	#page-content-wrapper {
		margin-left: 260px;
		width: calc(100% - 260px);
	}

	/* 👇 cuando el sidebar está oculto */
	#page-content-wrapper.expanded {
		margin-left: 0;
		width: 100%;
	}
}

/* Navbar */
.navbar {
	position: sticky;
	top: 0;
	z-index: 1100; // por encima del contenido
	background-color: var(--color-white);
	border-bottom: 1px solid var(--color-bg);
	box-shadow: 0 1px 3px var(--shadow-md);
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
	color: var(--color-btn-toggle-loyouts);
	font-size: 1.25rem;
	cursor: pointer;
	display: flex;
	align-items: center;

	&:hover {
		color: #2563eb;
	}
}

.overlay {
	position: fixed;
	inset: 0;
	background: var(--shadow-md);
	z-index: 900;
}

@media (min-width: 768px) {
	.overlay {
		display: none;
	}
}
</style>