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
	background-color: #1e293b;
	color: white;
	border-right: 1px solid #e5e7eb;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	padding: 1rem 0;
	z-index: 1000;

	transition: transform 0.3s ease;

	&.collapsed {
		transform: translateX(-100%);
	}
}
</style>