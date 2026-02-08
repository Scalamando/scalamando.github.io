import Color from "colorjs.io";

export function toRGB(color: string): string;
export function toRGB<T extends Record<string, string>>(colors: T): T;
export function toRGB(color: string | Record<string, string>) {
	if (typeof color === "string") {
		return new Color(color).toString({format: "rgba"});
	}

	return Object.fromEntries(Object.entries(color).map(([key, val]) => [key, toRGB(val)]));
}
