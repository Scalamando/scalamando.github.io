import { toRGB } from "@/utils/color";
import twColors from "tailwindcss/colors";

export const fontFamily = {
	sans: 'Ranade, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

export const colors = {
	"transparent": "transparent",
	"current": "currentColor",
	"black": "#0A0A0A",
	"slate": toRGB(twColors.slate),
	"white": toRGB(twColors.white),
	"cyan": toRGB(twColors.cyan),
	"lime": toRGB(twColors.lime),
	"brand-discord": "#5865F2",
	"brand-linkedin": "#0073AF",
	"brand-github": "#24292F",
};

export const dropShadow = {
	none: "0 0 0 rgb(0 0 0 / 0)",
	DEFAULT: "6px 6px 0 rgb(0 0 0 / 0.25)",
	lifted: "8px 8px 0 rgb(0 0 0 / 0.25)",
};
