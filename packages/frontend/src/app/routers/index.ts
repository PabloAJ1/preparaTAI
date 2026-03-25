import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../layouts/indexApp.vue';
import InicioPage from '../pages/InicioPage.vue'
import RepasoPage from '../pages/RepasoPage.vue'
import PracticaPage from '../pages/PracticaPage.vue'
import TestPage from '../pages/TestPage.vue'
import ExamenesPage from '../pages/ExamenesPage.vue'
import GestionDBPage from '../pages/GestionDBPage.vue'

const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '',
				component: InicioPage,
			},{
				path: '/repaso',
				component: RepasoPage,
			},{
				path: '/practicas',
				component: PracticaPage,
			},{
				path: '/examenes',
				component: ExamenesPage,
			},{
				path: '/test/categoria/:id',
				name: 'TestByCategoria',
				component: TestPage,
				props: true,
			},{
				path: '/gestionDB',
				component: GestionDBPage,
			}
		],
	},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router