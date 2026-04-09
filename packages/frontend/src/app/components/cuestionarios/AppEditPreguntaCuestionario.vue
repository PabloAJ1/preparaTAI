<template>
	<div class="form-edit-pregunta">
		<!-- Estado -->
		<div id="estado" class="form-group">
			<label for="estado">Estado</label>
			<select v-model="localPregunta.estado">
				<option value="VALIDADO">Validado</option>
				<option value="REVISADO">Revisado</option>
				<option value="GPT">GPT</option>
				<option value="ENTERRADO">Enterrado</option>
				<option value="MARCADO">Marcado para revisar</option>
				<!-- añade más opciones según tus necesidades -->
			</select>
		</div>

		<!-- Enunciado -->
		<div id="enunciado" class="form-group">
			<label for="enunciado">Enunciado</label>
			<textarea v-model="localPregunta.enunciado" rows="3" placeholder="Escribe el enunciado de la pregunta..." />
		</div>

		<!-- Codigo -->
		<div 
			v-if="localPregunta.codigo"
			id="codigo" 
			class="form-group"
		>
			<label for="codigo">Codigo</label>
			<textarea v-model="localPregunta.codigo" rows="3" placeholder="Codigo" @keydown="insertarTab"/>
		</div>

		<!-- Respuestas -->
		<div id="respuestas" class="form-group">
			<label for="respuestas">Respuestas</label>
			<div class="respuestas-list">
				<div v-for="(r, i) in localPregunta.respuestas" :key="i" class="respuesta-card"
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
import { nextTick, ref, watch } from 'vue';
import { Pregunta } from '@preparatai/api-client';

const props = defineProps<{
	preguntaEditando: Pregunta;
}>();

const emit = defineEmits<{
  (e: 'update', pregunta: Pregunta): void;
}>();

// Copia local para edición
const localPregunta = ref<Pregunta>({
	...props.preguntaEditando,
	respuestas: props.preguntaEditando.respuestas.map(r => ({ ...r })),
});


// Sincronizar si cambia el prop
watch(
    localPregunta, 
    (newValue) => {
        emit('update', newValue);
    }, 
    { deep: true } // Importante para detectar cambios en arrays de respuestas
);

// Funciones
function seleccionarCorrecta(index: number) {
	localPregunta.value.respuestas.forEach((r, i) => {
		r.correcta = i === index;
	});
}

function agregarRespuesta() {
	localPregunta.value.respuestas.push({ enunciado: '', correcta: false });
}

function eliminarRespuesta(index: number) {
	localPregunta.value.respuestas.splice(index, 1);
}

const insertarTab = (event: KeyboardEvent) => {
	if (event.key === 'Tab') {
		event.preventDefault();

		const el = event.target as HTMLTextAreaElement;
		if (!el) return;

		const start = el.selectionStart;
		const end = el.selectionEnd;

		const tabChar = '\t';

		localPregunta.value.codigo = 
			(localPregunta.value.codigo ?? '').substring(0, start) +
			tabChar +
			(localPregunta.value.codigo ?? '').substring(end);

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
					background-color: var(--color-textbox-bg);;
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