import { defineConfig } from "astro/config";

import Icons from "unplugin-icons/vite";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	vite: {
		plugins: [
			Icons({
				compiler: "astro",
				scale: 1.25,
				iconCustomizer(collection, _icon, props) {
					if (collection === "tabler") {
						props.width = "24px";
						props.height = "24px";
					}
				},
			}),
		],
	},
});
