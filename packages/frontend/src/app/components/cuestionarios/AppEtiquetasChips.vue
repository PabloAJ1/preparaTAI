<template>
	<div class="tag-input">
		<!-- Chips -->
		<div class="chips">
			<span v-for="tag in seleccionadas" :key="tag.id" class="chip">
				{{ tag.nombre }}
				<button @click="removeTag(tag.id)">×</button>
			</span>
		</div>

		<!-- Input -->
		<input v-model="input" @keydown.enter.prevent="handleEnter" placeholder="Añadir etiqueta..." />

		<!-- Sugerencias -->
		<ul v-if="input && sugerencias.length" class="sugerencias">
			<li v-for="s in sugerencias" :key="s.id" @click="addTag(s)">
				{{ s.nombre }}
			</li>
		</ul>

		<!-- Crear nueva -->
		<div v-if="input && !sugerencias.length" class="crear">
			Crear "<strong>{{ input }}</strong>"
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQueryClient, useMutation } from '@tanstack/vue-query'

import { useCategorias } from '../../services/etiquetas.service'
import { categoriasApi } from '../../api/categoria.wrapper'
import { Categoria } from '@preparatai/api-client'

const props = defineProps<{
	categoriasExistentes?: Categoria[]
}>()

const { data: categorias } = useCategorias()

const input = ref('')
const model = defineModel<Categoria[]>({ default: [] })
const seleccionadas = model

watch(
  () => props.categoriasExistentes,
  (val) => {
    if (val?.length && model.value.length === 0) {
      model.value = [...val]
    }
  },
  { immediate: true }
)

const sugerencias = computed(() => {
	if (!categorias.value) return []

	return categorias.value
		.filter(c =>
			c.nombre.toLowerCase().includes(input.value.toLowerCase()) &&
			!model.value.some(s => s.id === c.id)
		)
})

const addTag = (categoria: Categoria) => {
	if (model.value.some(c => c.id === categoria.id)) return

	model.value.push(categoria)
	input.value = ''
}

const removeTag = (id: string) => {
	model.value =
		model.value.filter(c => c.id !== id)
}

const queryClient = useQueryClient()

const createMutation = useMutation({
	mutationFn: (nombre: string) =>
		categoriasApi.create(nombre),

	onSuccess: (nuevaCategoria) => {
		model.value.push(nuevaCategoria)
		queryClient.invalidateQueries({ queryKey: ['categorias'] })
	}
})

const handleEnter = () => {
	if (!input.value) return

	const existente = categorias.value?.find(
		c => c.nombre.toLowerCase() === input.value.toLowerCase()
	)

	if (existente) {
		addTag(existente)
		return
	}

	createMutation.mutate(input.value)
	input.value = ''
}

</script>

<style lang="scss">
.tag-input {
	border: 1px solid var(--color-smoke);
	padding: 8px;
	border-radius: 8px;
	position: relative;
}

.chips {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin-bottom: 6px;
}

.chip {
	background: var(--color-chips-bg);
	padding: 4px 8px;
	border-radius: 999px;
	display: flex;
	align-items: center;
	gap: 4px;
}

.chip button {
	border: none;
	background: transparent;
	cursor: pointer;
}

.sugerencias {
	position: absolute;
	background: var(--color-select-bg);
	border: 1px solid var(--color-select-border);
	width: 100%;
	margin-top: 4px;
	list-style: none;
	padding: 0;
}

.sugerencias li {
	padding: 6px;
	cursor: pointer;
}

.sugerencias li:hover {
	background: var(--color-select-hover);
}
</style>