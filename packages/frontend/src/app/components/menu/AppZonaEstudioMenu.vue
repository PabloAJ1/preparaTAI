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
			<i class="fa-solid fa-book-open" /> Repasar Tema
		</router-link>

		<router-link
			to="/practicas"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-puzzle-piece" /> Practicar
		</router-link>
		
		<router-link
			to="/examenes"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-file-signature" /> Examenes
		</router-link>

		<router-link
			to="/grupoPreguntas"
			class="list-group-item list-group-item-action list-group-item-dark"
		>
			<i class="fa-solid fa-layer-group" /> Grupo de Preguntas
		</router-link>		
	</section>
</template>
