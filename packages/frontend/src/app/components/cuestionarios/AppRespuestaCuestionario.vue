<template>
	<div
		class="respuesta-item"
		:class="[
			{
				'is-success':
					respondida &&
					respuesta.correcta &&
					seleccionada?.enunciado === respuesta.enunciado,
				'is-error':
					respondida &&
					!respuesta.correcta &&
					seleccionada?.enunciado === respuesta.enunciado,
				'is-disabled': respondida,
			},
			{ 'modo-practica': modo === 'practica' },
		]"
		@click="!respondida && $emit('seleccionar', respuesta)"
	>
		<div class="respuesta-icon">
			<i :class="iconoClase" />
		</div>

		<div class="respuesta-texto font-monospace">
			{{ respuesta.enunciado }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Respuesta } from '@preparatai/api-client';

const props = defineProps<{
	respuesta: Respuesta;
	respondida: boolean;
	seleccionada: Respuesta | null;
	modo: string;
}>();

defineEmits<{
	(e: 'seleccionar', respuesta: Respuesta): void;
}>();

// Extraemos la lógica del icono a un computed para limpiar el template
const iconoClase = computed(() => {
	const isSelected =
		props.seleccionada?.enunciado === props.respuesta.enunciado;

	if (!props.respondida) return 'fa-regular fa-circle text-muted';

	if (props.respuesta.correcta && isSelected) {
		return 'fa-solid fa-circle-check text-success';
	} else if (!props.respuesta.correcta && isSelected) {
		return 'fa-solid fa-circle-xmark text-danger';
	}

	return 'fa-regular fa-circle text-muted';
});
</script>

<style scoped lang="scss">
// Paleta de colores SCSS
$border-color: var(--color-respuesta-border);
$text-color: var(--color-respuesta-text);
$muted-color: var(--color-respuesta-muted);

$success-bg: var(--color-respuesta-success-bg);
$success-border: var(--color-respuesta-success-border);
$success-icon: var(---color-respuesta-success-icon);

$error-bg: var(--color-respuesta-error-bg);
$error-border: var(--color-respuesta-error-border);
$error-icon: var(--color-respuesta-error-icon);

.respuesta-item {
	display: flex;
	align-items: center;
	padding: 1rem;
	background-color: var(--color-cuestionario-bg);
	cursor: pointer;
	transition: all 0.2s ease;
	touch-action: manipulation;

	&:not(.modo-practica):not(:first-child) {
		border-top: 1px solid $border-color;
	}

	&.modo-practica {
		border: 1px solid $border-color;
		border-radius: 0.4rem;
	}

	&:hover:not(.is-disabled) {
		background-color: var(--color-cuestionario-bg-hover)
	}

	&.modo-practica:hover:not(.is-disabled) {
		transform: translateY(-1px);
		box-shadow: 0 2px 6px var(--shadow-md);
	}

	// --- Estados Especiales ---
	&.is-disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}

	// Éxito (Verde)
	&.is-success {
		background-color: $success-bg;
		border-color: $success-border; // Sobrescribe el border-top del elemento

		// Si la siguiente respuesta existe, arreglamos su borde superior para que no se pisen
		& + .respuesta-item {
			border-top-color: $success-border;
		}
	}

	// Error (Rojo)
	&.is-error {
		background-color: $error-bg;
		border-color: $error-border;

		& + .respuesta-item {
			border-top-color: $error-border;
		}
	}
}

@media (max-width: 640px) {
	.respuesta-item {
		min-height: 60px;
		padding: 1.2rem;
	}
}

.respuesta-icon {
	display: flex;
	align-items: center;
	margin-right: 0.75rem;
	font-size: 1.25rem;

	// Clases utilitarias de iconos
	.text-success {
		color: $success-icon;
	}
	.text-danger {
		color: $error-icon;
	}
	.text-muted {
		color: $muted-color;
	}
}

.respuesta-texto {
	flex: 1;
	color: $text-color;
	font-size: 1rem;

	hyphens: auto;
	line-height: 1.4;
	min-width: 0; // 👈 MUY importante en flexbox
	word-break: break-word;       // 👈 clave
	overflow-wrap: anywhere;      // 👈 aún mejor para casos extremos
}

.font-monospace {
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
