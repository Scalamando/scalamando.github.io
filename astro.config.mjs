import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import Icons from "unplugin-icons/vite";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	vite: {
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		plugins: [
			Icons({
				compiler: "astro",
			}),
		],
	},
});
