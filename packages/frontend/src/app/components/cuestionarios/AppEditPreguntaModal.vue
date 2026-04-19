<template>
	<Teleport to="body">
		<transition name="modal">
			<div v-if="visible" class="modal-overlay">
				<div class="pt-modal">
					<!-- Header -->
					<header v-if="titulo" class="modal-header">
						<h3>{{ titulo }}</h3>
						<button class="btn-close" @click="cerrar">
							<i class="fa-solid fa-xmark"></i>
						</button>
					</header>

					<!-- Body -->
					<section class="modal-body">
						<slot />
					</section>

					<!-- Footer -->
					<footer class="modal-footer">
						<button class="btn btn-cancel" @click="cerrar">
							<i class="fa-regular fa-circle-xmark"></i> Cancelar
						</button>
						<button class="btn btn-save" @click="$emit('save')">
							<i class="fa-regular fa-floppy-disk"></i> Guardar
						</button>
					</footer>
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

const emit = defineEmits(['close', 'save']);

function cerrar() {
	emit('close');
}

// Cerrar modal con Escape
function handleKey(e: KeyboardEvent) {
	if (e.key === 'Escape') cerrar();
}

console.log("Caracoli");

onMounted(() => window.addEventListener('keydown', handleKey));
onUnmounted(() => window.removeEventListener('keydown', handleKey));
</script>

<style scoped lang="scss">
/* Overlay */
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

/* Modal */
.pt-modal {
	background: var(--color-main-bg);
	border-radius: 12px;
	width: 100%;
	max-width: 90vh;
	max-height: 90vh;
	padding: 1.4rem;
	box-shadow: 0 10px 25px var(--shadow-lg), 0 4px 10px var(--shadow-sm);
	overflow-y: auto;
	display: flex;
	flex-direction: column;
}

/* Header */
.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.75rem;
	color: var(--color-text-main);
}

.modal-header h3 {
	font-size: 1.1rem;
	font-weight: 600;
	margin: 0;
	color: var(--color-text-main);
}

.btn-close {
	border: none;
	background: transparent;
	font-size: 1.2rem;
	cursor: pointer;
	color: var(--color-text-main);
	transition: color 0.15s;
}

.btn-close:hover {
	color: var(--color-text-tertiary);
}

/* Body */
.modal-body {
	font-size: 0.95rem;
	line-height: 1.45;
	color: var(--color-text-main);
	flex: 1;
	overflow-y: auto;
}

/* Footer */
.modal-footer {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 1rem;
}

/* Buttons */
.btn {
	border: none;
	border-radius: 6px;
	padding: 6px 14px;
	cursor: pointer;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	gap: 6px;
}

.btn-cancel {
	background: transparent;
	color: var(--color-text-main);
}

.btn-save {
	background: transparent;
	color: var(--color-text-main);
}

.btn:hover {
	opacity: 0.9;
}

/* Animations */
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