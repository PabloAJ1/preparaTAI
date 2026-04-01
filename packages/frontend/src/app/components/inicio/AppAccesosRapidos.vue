<template>
	<div class="nav-grid">
		<div class="nav-item">
			<a class="nav-link">
				<div class="nav-card-pro">
					<div class="icon-wrapper icon-repaso">
						<i class="fa-solid fa-book-open-reader" />
					</div>

					<h4 class="nav-title">Repasar Temas</h4>

					<p class="nav-text">
						Test varios para repasar temas.
					</p>
				</div>
			</a>
		</div>

		<div class="nav-item">
			<a class="nav-link">
				<div class="nav-card-pro">
					<div class="icon-wrapper icon-green">
						<i class="fa-solid fa-bolt-lightning" />
					</div>

					<h4 class="nav-title">Práctica Rápida</h4>

					<p class="nav-text">
						Test de repaso para practicar.
					</p>
				</div>
			</a>
		</div>

		<div class="nav-item">
			<a class="nav-link">
				<div class="nav-card-pro">
					<div class="icon-wrapper icon-amber">
						<i class="fa-solid fa-file-signature" />
					</div>

					<h4 class="nav-title">Cuestionarios</h4>

					<p class="nav-text">
						Accede a los cuestionarios oficiales de las convocatorias 2014-2024.
					</p>
				</div>
			</a>
		</div>
	</div>
</template>

<style scoped lang="scss">

.nav-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.5rem;
	justify-content: center;
}

.nav-link {
	text-decoration: none;
	display: block;
	height: 100%;
}

.nav-card-pro {
	border: none;
	border-radius: 20px;
	background: white;
	text-align: center;
	padding: 2.5rem 1.5rem;
	height: 100%;

	box-shadow: 0 10px 15px -3px var(--shadow-md),
				0 4px 6px -2px var(--shadow-sm);

	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

	&:hover {
		transform: translateY(-12px);
		box-shadow: 0 25px 50px -12px var(--shadow-lg)
	}
}

.nav-title {
	font-weight: 700;
	color: var(--color-text-tertiary);
	margin-bottom: 0.5rem;
}

.nav-text {
	color: var(--color-text-subs);
	font-size: 0.875rem;
	margin-bottom: 0;
}

.icon-wrapper {
	width: 70px;
	height: 70px;
	border-radius: 18px;

	display: flex;
	align-items: center;
	justify-content: center;

	margin: 0 auto 1.5rem;

	font-size: 1.8rem;
}

/* Colores de iconos */

.icon-repaso {
	background: var(--color-repasos-bg);
	color: var(--color-repasos);
}

.icon-green {
	background: var(--color-practicas-bg);
	color: var(--color-practicas)
}

.icon-amber {
	background: var(--color-examenes-bg);
	color: var(--color-examenes);
}
/* Responsive */

@media (max-width: 900px) {
	.nav-grid {
		grid-template-columns: 1fr;
	}
}

</style>