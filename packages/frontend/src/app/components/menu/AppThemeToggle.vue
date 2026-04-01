<template>
	<div class="theme-toggle">
		<label class="switch">
			<input type="checkbox" v-model="isDark" @change="toggleTheme" />
			<span class="slider"></span>
		</label>

		<span class="theme-label">
			{{ isDark ? "Modo oscuro" : "Modo claro" }}
		</span>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const isDark = ref(false)

onMounted(() => {
	const savedTheme = localStorage.getItem("theme")

	if (savedTheme === "dark") {
		isDark.value = true
		document.documentElement.dataset.theme = "dark"
	}
})

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
	background-color: #ccc;
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
	background-color: white;
	border-radius: 50%;
	transition: 0.3s;
}

input:checked + .slider {
	background-color: #2563eb;
}

input:checked + .slider::before {
	transform: translateX(20px);
}
</style>