<template>
	<div class="cuerpo">
		<AppEditPreguntaCuestionario
			:pregunta-editando="nuevaPregunta"
			@update="nuevaPregunta = $event"
		/>
		
		<button 
			class="btn btn-save" 
			:disabled="!esValida"
			@click="guardarPregunta"
		>
			<i class="fa-regular fa-floppy-disk" /> Guardar
		</button>
	</div>
</template>

<script setup lang="ts">
import { Categoria, Configuration, Pregunta, PreguntasApi } from '@preparatai/api-client';
import AppEditPreguntaCuestionario from '../components/cuestionarios/AppEditPreguntaCuestionario.vue';
import { computed, ref } from 'vue';

const api = new PreguntasApi(
	new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL })
);

function crearPreguntaVacia(categorias?:  Categoria[]): Pregunta {
	return {
		estado: 'Revisado',
		enunciado: '',
		codigo: '',
		respuestas: [
			{ enunciado: '', correcta: false, id: 'nuevo-1' },
			{ enunciado: '', correcta: false, id: 'nuevo-2' },
			{ enunciado: '', correcta: false, id: 'nuevo-3' },
			{ enunciado: '', correcta: false, id: 'nuevo-4' }
		],
		categorias: categorias ?? [],
		estadisticas: { aciertos: 0, fallos: 0, total: 0 },
		id: 'nuevo'
	};
}
const nuevaPregunta = ref<Pregunta>(crearPreguntaVacia());

function validarPregunta(p: Pregunta): string[] {
	const errores: string[] = [];

	if (!p.enunciado.trim()) {
		errores.push('El enunciado es obligatorio');
	}

	if (!p.respuestas || p.respuestas.length === 0) {
		errores.push('Debe haber al menos una respuesta');
	}

	const respuestasValidas = p.respuestas.filter(r => r.enunciado.trim());

	if (respuestasValidas.length < 2) {
		errores.push('Debe haber al menos 2 respuestas con texto');
	}

	const tieneCorrecta = p.respuestas.some(r => r.correcta);

	if (!tieneCorrecta) {
		errores.push('Debe haber al menos una respuesta correcta');
	}

	if(!p.categorias || p.categorias.length < 1)
		errores.push('Debe haber al menos una categoria');

	return errores;
}

const esValida = computed(() => {
	return validarPregunta(nuevaPregunta.value).length === 0;
});


async function guardarPregunta() {
	if (!nuevaPregunta.value) return;

	try {
		await api.createPregunta({
			pregunta: nuevaPregunta.value
		});

		nuevaPregunta.value = crearPreguntaVacia(nuevaPregunta.value.categorias);

	} catch (error) {
		if (error instanceof SyntaxError) {
			// Lo tratamos como éxito igualmente
			nuevaPregunta.value = crearPreguntaVacia(nuevaPregunta.value.categorias);
			return;
		}

		console.error('Error al guardar:', error);
	}
}

</script>

<style lang="scss">
.cuerpo {
	color: var(--color-text-main);
}

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

.btn-save {
	background: transparent;
	color: var(--color-text-main);
}
</style>