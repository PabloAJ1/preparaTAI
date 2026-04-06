<template>
	<div class="sidebar-brand">
		<div class="brand-container">
			<i class="fa-solid fa-graduation-cap brand-icon" />

			<div class="brand-text">
				<span class="brand-title">PREPARADOR TAI</span>
				<span class="brand-version">v3.0</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.brand-container {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.brand-icon {
	color: var(--menu-text-head);
	font-size: 1.25rem;
}

.brand-text {
	display: flex;
	flex-direction: column;
}

.sidebar-brand {
    padding: 1.5rem 1.5rem 1.5rem;
    background: var(--menu-cabecera-shadow);
    border-bottom: 1px solid var(--menu-separador-color);
}

.brand-title {
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: -0.5px;
    color: var(--menu-text-head);
    display: block;
}

.brand-version {
    font-size: 0.75rem;
    color: var(--menu-text-versions);
    font-weight: 500;
    border-radius: 4px;
    display: inline-block;
    margin-top: 4px;
}

</style>