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

.sidebar-brand {
    padding: 1.5rem 1.5rem 1.5rem;
    background: rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.brand-title {
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: -0.5px;
    color: #fff;
    display: block;
}

.brand-version {
    font-size: 0.75rem;
    color: #60a5fa;
    font-weight: 500;
    background: rgba(96, 165, 250, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block;
    margin-top: 4px;
}

</style>