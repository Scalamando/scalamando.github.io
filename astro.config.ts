import { defineConfig } from "astro/config";
import fs from "node:fs";
import Icons from "unplugin-icons/vite";
import compress from "astro-compress";
import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		compress(),
	],
	site: "https://rai-canzler.de",
	vite: {
		ssr: {
			external: ["@resvg/resvg-js"],
		},
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
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
			{
				name: "woff-loader",
				transform(_code, id) {
					if (!id.match(/.woff$/)) {
						return null;
					}
					const data = fs.readFileSync(id);
					return `export default new Uint8Array([${[...data.values()]}]);`;
				},
			},
			tailwindcss()
		],
	},
});
