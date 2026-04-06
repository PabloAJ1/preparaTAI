<template>
	<div id="wrapper">
		<AppMenu :collapsed="sidebarCollapsed" />

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
	overflow-x: hidden;
}

#page-content-wrapper {
	width: 100%;
	min-height: 100vh;
	transition: all 0.3s ease;
}

@media (min-width: 768px) {
	#page-content-wrapper {
		margin-left: 260px;
		width: calc(100% - 260px);
	}

	#page-content-wrapper.expanded {
		margin-left: 0;
		width: 100%;
	}
}

/* Navbar */
.navbar {
	position: sticky;
	top: 0;
	z-index: 1100;
	background-color: var(--color-navbar-bg);
	border-bottom: 1px solid var(--color-bottom-border);
	box-shadow: 0 1px 3px var(--color-box-shadow);
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
	color: var(--color-menu-icons);
	font-size: 1.25rem;
	cursor: pointer;
	display: flex;
	align-items: center;

	&:hover {
		color: var(--color-menu-icons-hover);
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