/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/packages/frontend',
	server: {
		port: 6200,
		host: 'localhost',
	},
	preview: {
		port: 5300,
		host: 'localhost',
	},
	plugins: [vue()],
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },
	build: {
		outDir: './dist',
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	test: {
		name: '@ts-demo/frontend',
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		reporters: ['default'],
		coverage: {
			reportsDirectory: './test-output/vitest/coverage',
			provider: 'v8' as const,
		},
	},
	resolve: {
		alias: {
		// Asegúrate de que la ruta apunte correctamente al index.ts de tu lib
			'@preparatai/api-client': path.resolve(__dirname, '../../libs/api-client/src/index.ts')
		}
	}
}));
