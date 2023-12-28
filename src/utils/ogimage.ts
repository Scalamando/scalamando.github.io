import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import twConfig from "../../tailwind.config";
import ranadeRegularFont from "@/assets/Ranade-Regular.woff";
import ranadeMediumFont from "@/assets/Ranade-Medium.woff";
import ranadeBoldFont from "@/assets/Ranade-Bold.woff";
import { html } from "satori-html";
import type { APIContext, APIRoute } from "astro";

const OG_WIDTH = 2400;
const OG_HEIGHT = 1260;

export interface DefineOgImageHandlerOptions<RouteProps extends Record<string, any>> {
	width: number;
	height: number;
	props: RouteProps;
}

type DefineOgImageHandlerReturn = ReturnType<typeof html>;

export function defineOgImageHandler<RouteProps extends Record<string, any>>(
	markupFn: (
		opts: DefineOgImageHandlerOptions<RouteProps>,
	) => DefineOgImageHandlerReturn | Promise<DefineOgImageHandlerReturn>,
): APIRoute<RouteProps> {
	return async (ctx: APIContext<RouteProps>) => {
		const markup = await markupFn({ width: OG_WIDTH, height: OG_HEIGHT, props: ctx.props });

		console.dir(markup, {depth: 15})

		const background = {
			type: "img",
			props: {
				src: backgroundPattern(OG_WIDTH, OG_HEIGHT),
				tw: "absolute w-full h-full bg-white",
			},
		};
		if (Array.isArray(markup.props.children)) {
			markup.props.children.unshift(background);
		}

		const image = await createImage(markup, { width: OG_WIDTH, height: OG_HEIGHT });
		return new PNGResponse(image);
	};
}

export class PNGResponse extends Response {
	constructor(image: ArrayBuffer) {
		super(image, {
			headers: {
				"Content-Type": "image/png",
			},
		});
	}
}

export async function createImage(
	markup: Parameters<typeof satori>[0],
	opts: { width: number; height: number },
) {
	const svg = await satori(markup, {
		...opts,
		fonts: [
			{ name: "Ranade", data: ranadeRegularFont, weight: 400 },
			{ name: "Ranade", data: ranadeMediumFont, weight: 500 },
			{ name: "Ranade", data: ranadeBoldFont, weight: 700 },
		],
		tailwindConfig: { theme: twConfig.theme },
	});

	return toPng(svg);
}

export function toPng(svg: string) {
	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return pngData.asPng();
}

export function backgroundPattern(width: number, height: number, density: number = 20) {
	const cellSize = width / density;
	const dotSize = cellSize / 25;
	return (
		"data:image/svg+xml;base64," +
		btoa(`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
<pattern id="pattern-circles" x="0" y="0" width="${cellSize}" height="${cellSize}" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
<circle cx="${cellSize / 2 - dotSize / 2}" cy="${cellSize / 2 - dotSize / 2}" r="${
			cellSize / 25
		}" fill="#0a0a0a44"></circle>
</pattern>
<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
</svg>
`)
	);
}

export function resolveContentImage(src: string) {
	return import.meta.env.DEV
		? src.replace("/@fs", "").replace(/\?.*/, "")
		: new URL("." + src, new URL("../../", import.meta.url));
}
