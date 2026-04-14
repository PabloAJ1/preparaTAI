<template>
	<div class="form-wrapper">
		<!-- Estado global -->
		<div id="estado" class="form-group estado-box">
			<label>Estado global</label>
			<select v-model="estadoGlobal">
				<option value="VALIDADO">Validado</option>
				<option value="REVISADO">Revisado</option>
				<option value="GPT">GPT</option>
				<option value="ENTERRADO">Enterrado</option>
				<option value="MARCADO">Marcado para revisar</option>
			</select>
		</div>

		<div class="form-group estado-box">
			<label>Nombre Práctica</label>
			<input v-model="nombrePracticaGlobal" />
		</div>

		<!-- Lista preguntas -->
		<div class="list">
			<div
				v-for="(pregunta, i) in practica.pregunta"
				:key="i"
				class="respuesta-card"
			>
				<AppPracticaUnicaForm v-model="practica.pregunta[i]" />

				<div class="card-actions">
					<button class="btn btn-danger" @click="eliminarPregunta(i)">
						<i class="fas fa-trash"></i>
						Eliminar
					</button>
				</div>
			</div>
		</div>

		<!-- Add -->
		<div class="footer-actions">
			<button class="btn btn-primary" @click="agregarPregunta">
				<i class="fas fa-plus"></i>
				Añadir pregunta
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PracticaNueva } from '@preparatai/api-client';
import AppPracticaUnicaForm from './AppPracticaUnicaForm.vue';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
	modelValue?: PracticaNueva;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: PracticaNueva): void;
}>();

const crearPreguntaVacia = (): PracticaNueva => ({
	estado: 'REVISADO',
	nombrePractica: '',
	pregunta: []
});

const practica = ref<PracticaNueva>(
	props.modelValue ?? crearPreguntaVacia()
);

const estadoGlobal = computed({
	get: () => practica.value.estado,
	set: (val: string) => {
		practica.value.estado = val;
	}
});

const nombrePracticaGlobal = computed({
	get: () => practica.value.nombrePractica,
	set: (val: string) => {
		practica.value.nombrePractica = val;
	}
});


function agregarPregunta(){
	practica.value.pregunta.push({ enunciado: "", respuesta: ""})
}

function eliminarPregunta(index: number){
	practica.value.pregunta.splice(index, 1)
}

watch(
	() => props.modelValue,
	(val) => {
		if (val) practica.value = val;
	},
	{ deep: true, immediate: true }
);

watch(
	practica,
	() => {
		emit('update:modelValue', practica.value);
	},
	{ deep: true }
);
</script>

<style lang="scss">
.form-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
}

/* Estado */
.estado-box {
	background: var(--color-cuestionario-bg);
	padding: 1rem;
	border-radius: 10px;
	border: 1px solid var(--color-smoke);
}

.estado-box label {
	font-weight: 600;
	margin-bottom: 0.5rem;
	display: block;
}

select {
	width: 100%;
	padding: 0.55rem 0.75rem;
	border-radius: 8px;
	border: 1px solid var(--color-smoke);
	background-color: var(--color-textbox-bg);
	font-size: 0.95rem;
	outline: none;
	transition: all 0.2s ease;
}

/* Lista */
.list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

/* Card */
.respuesta-card {
	background: var(--color-cuestionario-bg);
	border: 1px solid var(--color-smoke);
	border-radius: 12px;
	padding: 1rem;
	transition: all 0.2s ease;
}

/* Acciones card */
.card-actions {
	display: flex;
	justify-content: flex-end;
	margin-top: 0.8rem;
}

/* Footer */
.footer-actions {
	display: flex;
	justify-content: center;
	padding-top: 0.5rem;
}

/* Buttons base */
.btn {
	border: none;
	border-radius: 8px;
	padding: 0.55rem 0.9rem;
	cursor: pointer;
	font-size: 0.9rem;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	transition: all 0.2s ease;
}

/* Primary */
.btn-primary {
	background: #7c3aed;
	color: white;
}

.btn-primary:hover {
	background: #6d28d9;
	transform: translateY(-1px);
}

/* Danger */
.btn-danger {
	background: transparent;
	color: #ef4444;
	border: 1px solid #ef4444;
}

.btn-danger:hover {
	background: #ef4444;
	color: white;
}

/* Icon alignment */
.btn i {
	font-size: 0.85rem;
}

input {
	flex: 1;
	width: 100%;
	padding: 0.3rem 0.5rem;
	border-radius: 6px;
	border: 1px solid var(--color-smoke);
	font-size: 0.95rem;
	color: var(--color-smoke);
	background-color: var(--color-textbox-bg);;
}
</style>