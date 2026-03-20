<template>
	<div class="text-white border-end d-flex flex-column" id="sidebar-wrapper">
		<AppCabeceraMenu />
		<AppZonaEstudioMenu />
		<AppAdministracionMenu />
		<AppSistemaMenu />
		<AppCreditosMenu />
	</div>
</template>

<script lang="ts">
import AppCabeceraMenu from './AppCabeceraMenu.vue';
import AppAdministracionMenu from './AppAdministracionMenu.vue';
import AppCreditosMenu from './AppCreditosMenu.vue';
import AppSistemaMenu from './AppSistemaMenu.vue';
import AppZonaEstudioMenu from './AppZonaEstudioMenu.vue';

export default {
	name: 'IndexPage',
	components: { AppCabeceraMenu, AppAdministracionMenu, AppCreditosMenu, AppSistemaMenu, AppZonaEstudioMenu },
};
</script>
