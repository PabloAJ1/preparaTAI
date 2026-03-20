import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../layouts/index.vue';
import InicioPage from '../pages/InicioPage.vue'
import RepasoPage from '../pages/RepasoPage.vue'
import PracticaPage from '../pages/PracticaPage.vue'
import CuestionariosPage from '../pages/CuestionariosPage.vue'

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
				path: '/test/categoria/:id',
				name: 'TestByCategoria',
				component: CuestionariosPage,
				props: true,
			},
		],
	},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router