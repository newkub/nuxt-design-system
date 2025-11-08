import Sonda from "sonda/nuxt"
import { autoReexport } from './app/plugins/re-export'

/**
 * Nuxt Configuration with Wrikka Design System
 * 
 * Architecture:
 * - Theme configuration → wrikka-theme.config.ts (UnoCSS theme)
 * - Vite configuration → nuxt.config.ts (vite section below)
 * - All configs in one place following Nuxt 4 best practices
 */
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",

	// ✨ Wrikka Design System Module
	modules: [
		"./modules/wrikka-design",              // Design system setup
		"./modules/component-meta-validator",   // Validate component metadata
		"@vueuse/nuxt",
		"nuxt-auth-utils",
		Sonda({
			open: true,
			server: false,
		}),
		"@nuxt/test-utils/module",
	],

	// Design System Configuration
	// Theme config: wrikka-theme.config.ts
	designSystem: {
		configPath: './wrikka-theme.config.ts',
		components: {
			enabled: true,
			dirs: ['~/app/components'],
			global: true
		},
		devtools: {
			enabled: true,
			strictTypeScript: true
		}
	},

	// Component Meta Validator Configuration
	componentMetaValidator: {
		enabled: true,
		componentsDir: 'app/components',
		metaDir: 'app/config/components',
		strictMode: false // true = error, false = warning
	},

	imports: {
		autoImport: false,
	},

	// ✨ Vite Configuration
	vite: {
		plugins: [
			// Auto Re-export Components
			autoReexport({
				basePath: 'app/components',
				folders: [
					'auth',
					'base',
					'data',
					'feedback',
					'layout',
					'media',
					'navigation'
				],
				generateRootIndex: true,
				verbose: false,
				watch: true
			}),
			

		],
		
		
	},

	nitro: {
		preset: "cloudflare",
	},

	routeRules: {
		"/admin/**": { prerender: false },
		"/old-page": { redirect: { statusCode: 301, to: "/" } },
	},

	runtimeConfig: {
		workosApiKey: "",
		workosClientId: "",
		openaiAPiKey: ""
	}
})
