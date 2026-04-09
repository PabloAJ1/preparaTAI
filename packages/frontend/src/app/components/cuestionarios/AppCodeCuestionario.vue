<template>
	<code ref="codeEl">{{ codigo }}</code>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { onMounted, ref } from 'vue';

const codeEl = ref<HTMLElement>();
const props = defineProps<{
	codigo: string;
}>();

onMounted(() => {
	if (codeEl.value) {
		hljs.highlightElement(codeEl.value);
	}
});


</script>