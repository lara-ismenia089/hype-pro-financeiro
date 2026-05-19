import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";


export default defineConfig([
	js.configs.recommended,

	...nextVitals,
	...nextTs,

	{
		plugins: {
			"simple-import-sort": simpleImportSort,
		},

		rules: {
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						// React / Next / libs externas
						["^react$", "^next", "^@?\\w"],

						// Aliases internos
						["^@/"],

						// Relativos
						["^\\."],

						// Side effects
						["^\\u0000"],
					],
				},
			],

			"simple-import-sort/exports": "error",
		},
	},

	globalIgnores([
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
]);