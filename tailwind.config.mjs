import colors from "tailwindcss/colors";
import typographyPlugin from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: 'Ranade, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: "#0A0A0A",
			white: colors.white,
			cyan: colors.cyan,
			lime: colors.lime,
		},
		dropShadow: { DEFAULT: "6px 6px 0 rgb(0 0 0 / 0.25)" },
		extend: {
			colors: {
				"brand-discord": "#5865F2",
				"brand-linkedin": "#0073AF",
				"brand-github": "#24292F",
			},
		},
	},
	plugins: [typographyPlugin],
};
