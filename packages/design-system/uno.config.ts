import { defineConfig, presetIcons, presetWind4 } from "unocss";

export default defineConfig({
	presets: [
		presetWind4({
			preflights: { 
			  reset: true, 
			} 
		  }),
		presetIcons({
			cdn: "https://esm.sh/",
			scale: 1.2,
			collections: {
				logos: () =>
					import("@iconify-json/logos/icons.json").then((i) => i.default),
			},
		}),
	],
	shortcuts: {
		btn: "px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer",
		"btn-outline":
			"btn border-2 border-primary text-primary hover:bg-primary/10",
		"btn-primary": "btn bg-primary text-white hover:bg-primary/90",
		"btn-secondary": "btn bg-secondary text-white hover:bg-secondary/90",
		card: "p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700",
	},
});
