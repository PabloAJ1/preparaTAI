<template>
	<div class="row g-4 justify-content-center">
		<div class="col-md-4">
			<a class="text-decoration-none h-100 d-block">
				<div class="card nav-card-pro shadow-sm h-100">
					<div class="icon-wrapper icon-blue">
						<i class="fa-solid fa-book-open-reader" />
					</div>
					<h4 class="fw-bold text-dark">Repasar Temas</h4>
					<p class="text-secondary small mb-0">
						Test varios para repasar temas.
					</p>
				</div>
			</a>
		</div>

		<div class="col-md-4">
			<a class="text-decoration-none h-100 d-block">
				<div class="card nav-card-pro shadow-sm h-100">
					<div class="icon-wrapper icon-green">
						<i class="fa-solid fa-bolt-lightning" />
					</div>
					<h4 class="fw-bold text-dark">Práctica Rápida</h4>
					<p class="text-secondary small mb-0">
						Test de repaso para practicar.
					</p>
				</div>
			</a>
		</div>

		<div class="col-md-4">
			<a class="text-decoration-none h-100 d-block">
				<div class="card nav-card-pro shadow-sm h-100">
					<div class="icon-wrapper icon-amber">
						<i class="fa-solid fa-file-signature" />
					</div>
					<h4 class="fw-bold text-dark">Cuestionarios</h4>
					<p class="text-secondary small mb-0">
						Accede a los cuestionarios oficiales de las convocatorias 2014-2024.
					</p>
				</div>
			</a>
		</div>
	</div>
</template>

<style>
	/* Tarjetas de navegación mejoradas */
    .nav-card-pro {
        border: none;
        border-radius: 20px;
        background: white;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        padding: 2.5rem 1.5rem;
    }

    .nav-card-pro:hover {
        transform: translateY(-12px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
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

    /* Esquema de colores para los iconos */
    .icon-blue { background: #e0f2fe; color: #0284c7; }
    .icon-green { background: #dcfce7; color: #16a34a; }
    .icon-amber { background: #fef3c7; color: #d97706; }
</style>