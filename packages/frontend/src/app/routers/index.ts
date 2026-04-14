import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../layouts/indexApp.vue';
import InicioPage from '../pages/InicioPage.vue'
import RepasoPage from '../pages/RepasoPage.vue'
import PracticaPage from '../pages/PracticaPage.vue'
import TestPage from '../pages/TestPage.vue'
import ExamenesPage from '../pages/ExamenesPage.vue'
import GestionDBPage from '../pages/GestionDBPage.vue'
import GrupoPreguntasPage from '../pages/GrupoPreguntasPage.vue';
import GrupoTestPage from '../pages/GrupoTestPage.vue';
import CrearPreguntaPage from '../pages/CrearPreguntaPage.vue';
import CreatePracticaPage from '../pages/CreatePracticaPage.vue';

const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '',
				component: InicioPage,
			},{
				path: 'repaso',
				component: RepasoPage,
			},{
				path: 'practicas',
				component: PracticaPage,
			},{
				path: 'examenes',
				component: ExamenesPage,
			},{
				path: 'grupoPreguntas',
				component: GrupoPreguntasPage,
			},{
				path: 'test/categoria/grupo/:id',
				name: 'TestByGrupo',
				component: GrupoTestPage,
				props: true,
				},
				{
				path: 'test/categoria/:modo(repaso|practica|examen)/:id',
				name: 'TestByCategoria',
				component: TestPage,
				props: true,
			},{
				path: 'gestionDB',
				component: GestionDBPage,
			},{
				path: 'crear/pregunta',
				component: CrearPreguntaPage,
			},{
				path: 'crear/practica',
				component: CreatePracticaPage,
			}
		],
	},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router