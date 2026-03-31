<template>
	<Teleport to="body">
		<transition name="modal">
			<div v-if="visible" class="modal-overlay" @click.self="cerrar">
				<div class="pt-modal">
					<header v-if="titulo" class="modal-header">
						<h3>{{ titulo }}</h3>

						<button class="btn-close" @click="cerrar">✕</button>
					</header>

					<section class="modal-body">
						<slot />
					</section>
				</div>
			</div>
		</transition>
	</Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
	visible: boolean;
	titulo?: string;
}>();

const emit = defineEmits(['close']);

function cerrar() {
	emit('close');
}

function handleKey(e: KeyboardEvent) {
	if (e.key === 'Escape') cerrar()
}

onMounted(() => window.addEventListener('keydown', handleKey))
onUnmounted(() => window.removeEventListener('keydown', handleKey))

</script>

<style scoped lang="scss">
/* overlay */

.modal-overlay {
	position: fixed;
	inset: 0;

	background: rgba(0, 0, 0, 0.35);
	backdrop-filter: blur(4px);

	display: flex;
	align-items: center;
	justify-content: center;

	padding: 1rem;

	z-index: 10000;
}

/* modal */

.pt-modal {
	background: var(--color-white);
	border-radius: 12px;

	width: 100%;
	max-width: 420px;

	padding: 1.4rem;

	box-shadow: 0 10px 25px var(--shadow-lg), 0 4px 10px var(--shadow-sm);
}

/* header */

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.75rem;
}

.modal-header h3 {
	font-size: 1.1rem;
	font-weight: 600;
	margin: 0;
}

/* close button */

.btn-close {
	border: none;
	background: transparent;

	font-size: 1.2rem;
	cursor: pointer;

	color: var(--color-btn-toggle-loyouts);

	transition: color 0.15s;
}

.btn-close:hover {
	color: var(--color-temas-heading)
}

/* body */

.modal-body {
	font-size: 0.95rem;
	line-height: 1.45;
	color: var(--color-modal);
}

/* animations */

.modal-enter-active,
.modal-leave-active {
	transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: scale(0.95);
}
</style>
