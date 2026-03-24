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

.sidebar-brand {
	padding: 1.25rem 1.5rem;
	border-bottom: 1px solid rgba(255,255,255,0.1);
}

.brand-container {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.brand-icon {
	color: white;
	font-size: 1.25rem;
}

.brand-text {
	display: flex;
	flex-direction: column;
}

.brand-title {
	font-weight: 700;
	font-size: 0.9rem;
	letter-spacing: 0.05em;
}

.brand-version {
	font-size: 0.75rem;
	color: rgba(255,255,255,0.7);
}

</style>