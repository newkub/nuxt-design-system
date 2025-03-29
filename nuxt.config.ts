// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import checker from "vite-plugin-checker";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},
	modules: [
		"@nuxt/fonts",
		"@nuxt/icon",
		"@nuxtjs/color-mode",
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/robots",
		"@nuxtjs/sitemap",
		"@unocss/nuxt",
		"@nuxtjs/device",
		"@pinia/nuxt",
		"nuxt-viewport",
		"@formkit/auto-animate",
	],
	colorMode: {
		preference: "system",
		fallback: "light",
		classSuffix: "",
	},
	css: ["@unocss/reset/normalize.css", "@unocss/reset/tailwind.css"],
	vite: {
		plugins: [
			checker({
				typescript: true,
				vueTsc: true,
				eslint: {
					lintCommand: 'eslint "{src,tests}/**/*.{vue,ts,tsx}"',
					useFlatConfig: true,
				},
				stylelint: {
					lintCommand: 'stylelint "{src,tests}/**/*.{vue,css,scss}"',
				},
				biome: {
					command: "check",
				},
			}),
		],
	},
	typescript: {
		typeCheck: true,
	},
});
