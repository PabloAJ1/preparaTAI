<template>
	<div class="form-edit-pregunta">
		<!-- Estado -->
		<div id="estado" class="form-group">
			<label for="estado">Estado</label>
			<select v-model="pregunta.estado">
				<option value="VALIDADO">Validado</option>
				<option value="REVISADO">Revisado</option>
				<option value="GPT">GPT</option>
				<option value="ENTERRADO">Enterrado</option>
				<option value="MARCADO">Marcado para revisar</option>
				<!-- añade más opciones según tus necesidades -->
			</select>
		</div>

		<!-- Tags -->
		<AppEtiquetasChips 
			v-model="pregunta.categorias"
			:categorias-existentes="pregunta.categorias"
		/>

		<!-- Enunciado -->
		<div id="enunciado" class="form-group">
			<label for="enunciado">Enunciado</label>
			<textarea v-model="pregunta.enunciado" rows="3" placeholder="Escribe el enunciado de la pregunta..." />
		</div>

		<!-- Codigo -->
		<div 
			id="codigo" 
			class="form-group"
		>
			<label for="codigo">Codigo</label>
			<textarea v-model="pregunta.codigo" rows="3" placeholder="Codigo" @keydown="insertarTab"/>
		</div>

		<!-- Respuestas -->
		<div id="respuestas" class="form-group">
			<label for="respuestas">Respuestas</label>
			<div class="respuestas-list">
				<div v-for="(r, i) in pregunta.respuestas" :key="i" class="respuesta-card"
					:class="{ correcta: r.correcta }">
					<div class="respuesta-content">
						<span 
							class="radio"
							@click="seleccionarCorrecta(i)"
						>
							<i v-if="r.correcta" class="fas fa-check-circle"></i>
							<i v-else class="far fa-circle"></i>
						</span>
						<input v-model="r.enunciado" type="text" placeholder="Texto de la respuesta" />
					</div>

					<button class="btn-eliminar" @click="eliminarRespuesta(i)">
						<i class="fas fa-trash-alt"></i>
					</button>
				</div>

				<button class="btn-agregar" @click="agregarRespuesta">
					<i class="fas fa-plus"></i> Añadir respuesta
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import type { Pregunta } from '@preparatai/api-client';
import AppEtiquetasChips from './AppEtiquetasChips.vue';

const props = defineProps<{
	preguntaEditando?: Pregunta;
}>();

const emit = defineEmits<{
  (e: 'update', pregunta: Pregunta): void;
}>();

const crearPreguntaVacia = (): Pregunta => ({
	estado: 'REVISADO',
	enunciado: '',
	codigo: '',
	respuestas: [
		{ enunciado: '', correcta: false, id: 'nuevo-1' },
		{ enunciado: '', correcta: false, id: 'nuevo-2' }
	],
	categorias: [],
	estadisticas: { aciertos: 0, fallos: 0, total: 0},
	id: 'nuevo'
});

// estado interno SOLO para modo creación
const localPregunta = ref<Pregunta>(crearPreguntaVacia());

// 🔑 fuente única
const pregunta = computed({
	get: () => props.preguntaEditando ?? localPregunta.value,
	set: (val: Pregunta) => {
		if (props.preguntaEditando) {
			emit('update', val); // modo edición
		} else {
			localPregunta.value = val; // modo creación
			emit('update', val); // importante para el padre en create
		}
	}
});

// helpers para mutaciones reactivas
function updatePregunta() {
	pregunta.value = { ...pregunta.value };
}

// Funciones
function seleccionarCorrecta(index: number) {
	pregunta.value.respuestas.forEach((r, i) => {
		r.correcta = i === index;
	});
	updatePregunta();
}

function agregarRespuesta() {
	pregunta.value.respuestas.push({ enunciado: '', correcta: false, id: 'nuevo' });
	updatePregunta();
}

function eliminarRespuesta(index: number) {
	pregunta.value.respuestas.splice(index, 1);
	updatePregunta();
}

const insertarTab = (event: KeyboardEvent) => {
	if (event.key === 'Tab') {
		event.preventDefault();

		const el = event.target as HTMLTextAreaElement;
		if (!el) return;

		const start = el.selectionStart;
		const end = el.selectionEnd;

		const tabChar = '\t';

		pregunta.value.codigo = 
			(pregunta.value.codigo ?? '').substring(0, start) +
			tabChar +
			(pregunta.value.codigo ?? '').substring(end);

		updatePregunta();

		nextTick(() => {
			el.selectionStart = el.selectionEnd = start + tabChar.length;
		});
	}
};
</script>

<style scoped lang="scss">
.form-edit-pregunta {
	.form-group {
		margin-bottom: 1rem;
	}

	.form-group select {
		width: 100%;
		padding: 0.4rem 0.5rem;
		border-radius: 6px;
		border: 1px solid var(--color-smoke);
		background-color: var(--color-textbox-bg);
		font-size: 0.95rem;
	}

	label {
		font-weight: 600;
		display: block;
		margin-bottom: 0.5rem;
	}

	textarea {
		width: 100%;
		padding: 0.5rem;
		border-radius: 6px;
		border: 1px solid var(--color-smoke);
		resize: vertical;
		font-size: 0.95rem;
		background-color: var(--color-textbox-bg);
	}

	.respuestas-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.respuesta-card {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.5rem;
			border: 1px solid var(--color-smoke);
			border-radius: 8px;
			background: var(--color-respuesta-error-bg);
			transition: all 0.15s;

			&.correcta {
				border-color: var(--color-respuesta-success-border);
				background: var(--color-respuesta-success-border);
			}

			.respuesta-content {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				flex: 1;
				cursor: pointer;

				.radio {
					font-size: 1.2rem;
					width: 24px;
					text-align: center;
					color: var(--color-smoke-md);
				}

				input[type="text"] {
					flex: 1;
					padding: 0.3rem 0.5rem;
					border-radius: 6px;
					border: 1px solid var(--color-smoke);
					font-size: 0.95rem;
					color: var(--color-smoke);
					background-color: var(--color-textbox-bg);
				}
			}

			.btn-eliminar {
				background: transparent;
				border: none;
				color: var(--color-editar-eliminar-btn);
				cursor: pointer;
				font-size: 1.1rem;
				margin-left: 0.5rem;

				&:hover {
					color: var(--color-editar-eliminar-btn-hover);
				}
			}
		}

		.btn-agregar {
			margin-top: 0.5rem;
			padding: 0.4rem 0.8rem;
			border: none;
			border-radius: 6px;
			background: var(--color-editar-pregunta-agregar);
			color: var(--color-text-main);
			cursor: pointer;
			font-size: 0.95rem;
			display: flex;
			align-items: center;
			gap: 0.3rem;

			&:hover {
				background: var(--color-editar-pregunta-agregar-hover);
			}
		}
	}
}
</style>