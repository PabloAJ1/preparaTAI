import path from 'path';
import { defineConfig } from 'vitest/config';
import * as url from "url";

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
		setupFiles: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), './vitest.setup.ts'),

	},
	resolve: {
        alias: {
			 "@": path.resolve(__dirname, "src"),
		}
	}
});
