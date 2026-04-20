<template>
	<section>
		<div class="sidebar-header mt-2">
			Administración
		</div>

		<router-link
			to="/gestionDB"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid  fa-database" /> Gestion DB
		</router-link>

		<router-link
			to="/crear/pregunta"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-plus-circle" /> Añadir Nueva Pregunta
		</router-link>

		<router-link
			to="/crear/practica"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-square-plus" /> Añadir Nueva Practica
		</router-link>
	</section>
</template>