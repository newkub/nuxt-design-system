import Sonda from "sonda/nuxt";
import checker from "vite-plugin-checker";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	css: ["~/assets/token.css"],
	devtools: {
		enabled: true,
	},

	imports: {
		autoImport: false,
	},

	// ✨ Wrikka Design System Module
	modules: [
		//"./modules/wrikka-design",
		"@vueuse/nuxt",
		"nuxt-auth-utils",
		Sonda({
			open: true,
			server: false,
		}),
		"@nuxt/test-utils/module",
		//"./modules/docs",
		// Configure reexport module
		["@wrikka/reexport-module", { paths: ["app/components"] }],
	],

	nitro: {
		cloudflare: {
			deployConfig: true,
			nodeCompat: true,
		},
		preset: "cloudflare_module",
	},
	routeRules: {
		"/admin/**": { prerender: false },
		"/old-page": { redirect: { statusCode: 301, to: "/" } },
	},

	runtimeConfig: {
		openaiAPiKey: "",
		workosApiKey: "",
		workosClientId: "",
	},

	vite: {
		plugins: [
			checker({
				overlay: {
					initialIsOpen: false,
				},
				oxlint: true,
				typescript: true,
				vueTsc: true,
			}),
		],
	},

});
