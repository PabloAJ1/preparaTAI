import vue from 'eslint-plugin-vue';
import baseConfig from '../../eslint.config.mjs';

export default [
	...baseConfig,
	...vue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: await import('@typescript-eslint/parser'),
			},
		},
		rules: {
			'vue/html-indent': ['error', 'tab']
		}
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
		rules: {
			'vue/html-indent': ['error', 'tab', {
				baseIndent: 1,
				alignAttributesVertically: true
			}]
		},
	},
];
