import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "node:fs/promises";
import twConfig from "../../tailwind.config.ts";

export class PNGResponse extends Response {
	constructor(image: Buffer) {
		super(image, {
			headers: {
				"Content-Type": "image/png",
			},
		});
	}
}

export class SVGResponse extends Response {
	constructor(svg: string) {
		super(svg, {
			headers: {
				"Content-Type": "image/svg+xml",
			},
		});
	}
}

export async function createImage(
	markup: Parameters<typeof satori>[0],
	opts?: { width?: number; height?: number },
) {
	const fontUrl = new URL("../../public/fonts/Ranade-Variable.woff", import.meta.url);
	const ranadeFont = await fs.readFile(fontUrl);

	const svg = await satori(markup, {
		width: 1200,
		height: 768,
		...opts,
		fonts: [{ name: "Ranade", data: ranadeFont }],
		tailwindConfig: { theme: twConfig.theme },
	});

	return svg;
}

export function toPng(svg: string) {
	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return pngData.asPng();
}
