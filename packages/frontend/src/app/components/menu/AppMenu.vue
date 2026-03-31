<template>
	<div id="sidebar-wrapper" class="sidebar" :class="{ collapsed: collapsed }">
		<AppCabeceraMenu />
		<AppZonaEstudioMenu />
		<AppAdministracionMenu />
		<AppSistemaMenu />
		<AppCreditosMenu />
	</div>
</template>

<script lang="ts" setup>
import AppCabeceraMenu from './AppCabeceraMenu.vue';
import AppAdministracionMenu from './AppAdministracionMenu.vue';
import AppCreditosMenu from './AppCreditosMenu.vue';
import AppSistemaMenu from './AppSistemaMenu.vue';
import AppZonaEstudioMenu from './AppZonaEstudioMenu.vue';

defineProps<{ collapsed: boolean }>();
</script>

<style scoped lang="scss">

.sidebar {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 260px;
	background-color: var(--menu-bg);
	color: var(--menu-text);
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	z-index: 1200;

	transition: transform 0.3s ease;

	/* oculto por defecto en móvil */
	transform: translateX(-100%);
}

/* visible cuando NO está colapsado */
.sidebar:not(.collapsed) {
	transform: translateX(0);
}

/* en escritorio siempre visible */
@media (min-width: 768px) {
	.sidebar {
		transform: translateX(0);
	}

	/* 👇 permitir colapsar también en desktop */
	.sidebar.collapsed {
		transform: translateX(-100%);
	}
}
</style>