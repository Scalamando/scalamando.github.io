import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import twConfig from "../../tailwind.config";
import ranadeFont from "@assets/Ranade-Variable.woff"

export class PNGResponse extends Response {
	constructor(image: ArrayBuffer) {
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
