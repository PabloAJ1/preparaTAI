<template>
	<div class="inline-editor-container">
		<textarea
			v-model="valorInterno"
			class="enunciado-editable"
			rows="3"
			ref="textareaEl"
			@keydown="insertarTab"
		></textarea>

		<div class="botones-editor">
			<button class="btn-guardar" @click="guardar">✔ Guardar</button>
			<button class="btn-cancelar" @click="cancelar">❌ Cancelar</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';

const props = defineProps({
	modelValue: String,
});

const emit = defineEmits(['update:modelValue', 'guardar', 'cancelar']);
const valorInterno = ref(props.modelValue ?? '');
const textareaEl = ref<HTMLTextAreaElement>();

// Foco automático al montar
nextTick(() => textareaEl.value?.focus());

// Función para insertar tab
const insertarTab = (event: KeyboardEvent) => {
	if (event.key === 'Tab') {
		event.preventDefault();
		const el = textareaEl.value;
		if (!el) return;

		const start = el.selectionStart;
		const end = el.selectionEnd;

		const tabChar = '\t';
		valorInterno.value =
			valorInterno.value.substring(0, start) +
			tabChar +
			valorInterno.value.substring(end);

		nextTick(() => {
			el.selectionStart = el.selectionEnd = start + tabChar.length;
		});
	}
};

// Botones ✔ y ❌
const guardar = () => emit('guardar');
const cancelar = () => emit('cancelar');

watch(valorInterno, (nuevo) => {
	emit('update:modelValue', nuevo);
});
</script>

<style scoped>
.inline-editor-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.enunciado-editable {
  width: 100%;
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px var(--shadow-md);
  resize: vertical; /* permite ajustar altura si quieres */
  font-family: inherit;
  margin-bottom: 0.5rem; /* espacio antes de los botones */
  box-sizing: border-box;
}

.botones-editor {
  display: flex;
  justify-content: flex-end; /* botones al final */
  gap: 0.5rem;
}

.btn-guardar, .btn-cancelar {
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
}
</style>
