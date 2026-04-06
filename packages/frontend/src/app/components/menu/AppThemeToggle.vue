<template>
	<div class="theme-toggle">
		<label class="switch">
			<input type="checkbox" v-model="isDark" @change="toggleTheme" />
			<span class="slider"></span>
		</label>

		<span class="theme-label">
			<i :class="icono" />
		</span>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"

const isDark = ref(false)

onMounted(() => {
	const savedTheme = localStorage.getItem("theme")

	if (savedTheme === "dark") {
		isDark.value = true
		document.documentElement.dataset.theme = "dark"
	}
})

const icono = computed(() => {
	if(isDark.value)
		return 'fa-regular fa-moon';
	else
		return 'fa-solid fa-sun';
});

function toggleTheme() {
	const theme = isDark.value ? "dark" : "light"

	document.documentElement.dataset.theme = theme
	localStorage.setItem("theme", theme)
}
</script>

<style scoped lang="scss">
.theme-toggle {
	margin-top: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	padding: 10px 16px;
}

.switch {
	position: relative;
	display: inline-block;
	width: 40px;
	height: 20px;
}

.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	background-color: var(--menu-toggle-bg);
	border-radius: 20px;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transition: 0.3s;
}

.slider::before {
	position: absolute;
	content: "";
	height: 16px;
	width: 16px;
	left: 2px;
	bottom: 2px;
	background-color: var(--menu-toggle-bg-before);
	border-radius: 50%;
	transition: 0.3s;
}

input:checked + .slider {
	background-color: var(--menu-toggle-checked);
}

input:checked + .slider::before {
	transform: translateX(20px);
}
</style>