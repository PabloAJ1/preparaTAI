import './styles.scss';
import { createApp } from 'vue';
import App from './app/App.vue';
import router from './app/routers';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const queryClient = new QueryClient()

createApp(App)
	.use(router)
	.use(VueQueryPlugin, {
    	queryClient
	})
	.mount('#root');
