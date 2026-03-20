<template>
	<section>
		<div class="sidebar-header">Zona de Estudio</div>

		<router-link
			to="/"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-gauge-high" /> Dashboard
		</router-link>

		<router-link
			to="/repaso"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-gauge-high" /> Repasar Tema
		</router-link>

		<router-link
			to="/practicas"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-gauge-high" /> Practicar
		</router-link>

		<router-link
			to="/cuestionarios"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-gauge-high" /> Cuestionarios
		</router-link>
	</section>
</template>
