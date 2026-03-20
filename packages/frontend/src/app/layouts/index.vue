<template>
	<div class="d-flex" id="wrapper">
		<AppMenu />

		<div id="page-content-wrapper" class="bg-light w-100">
			<nav
				class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top"
			>
				<div class="container-fluid">
					<button class="btn text-secondary" id="sidebarToggle">
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

<script lang="ts">
import AppMenu from '../components/menu/AppMenu.vue';

export default {
	name: 'IndexPage',
	components: { AppMenu },
};
</script>

<style>
/* Fondo con textura de puntos para dar profundidad al gris de Bootstrap */
#page-content-wrapper {
	background-color: #f8fafc !important;
	background-image: radial-gradient(#cbd5e1 1px, transparent 1px) !important;
	background-size: 30px 30px !important;
}
</style>
