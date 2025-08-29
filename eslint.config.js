import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
	{
		ignores: ['.react-router/**/*'],
	},
	{ 
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		plugins: { js }, 
		extends: [
			"js/recommended",
			reactHooks.configs['recommended-latest'],
		],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommended,
	{
		...pluginReact.configs.flat.recommended,
		"settings": {
			"react": {
				"version": "detect",
				"defaultVersion": "19.0.0",
			}
		}
	},
	{
		rules: {
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",
			"@typescript-eslint/no-namespace": "off"
		}
	}
]);
