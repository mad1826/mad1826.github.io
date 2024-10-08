import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default [
	js.configs.recommended,
	stylistic.configs['recommended-flat'],
	{
		files: [
			'csce242/**/*.js',
			'eslint.config.js'
		],
		plugins: {
			'@stylistic': stylistic
		},
		languageOptions: {
			globals: {
				...globals.browser
			}
		},
		rules: {
			'prefer-const': 'error',
			'@stylistic/arrow-parens': ['error', 'as-needed'],
			'@stylistic/block-spacing': 'error',
			'@stylistic/comma-dangle': ['error', 'never'],
			'@stylistic/eol-last': ['error', 'never'],
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/max-statements-per-line': 'error',
			'@stylistic/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' } }],
			'@stylistic/no-tabs': 'off',
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/semi': ['error', 'always']
		}
	}
];