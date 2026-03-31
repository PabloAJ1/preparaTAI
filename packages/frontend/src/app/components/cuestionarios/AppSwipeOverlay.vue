<template>
	<div
		v-if="progreso < 0"
		class="swipe-overlay"
		:style="{ opacity: -progreso }"
	>
		<span class="swipe-text">{{ texto }}</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	progreso: number;
	texto: string;
}>();
</script>

<style scoped lang="scss">
.swipe-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--color-swipe-overlay);
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none;
	transition: opacity 0.2s;
}
.swipe-text {
	color: var(--color-white);
	font-weight: bold;
	font-size: 1.5rem;
}
</style>
