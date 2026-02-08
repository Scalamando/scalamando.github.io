import ranadeBoldFont from "@/assets/Ranade-Bold.woff";
import ranadeMediumFont from "@/assets/Ranade-Medium.woff";
import ranadeRegularFont from "@/assets/Ranade-Regular.woff";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext, APIRoute } from "astro";
import type { z } from "astro/zod";
import type { ImageFunction } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import satori from "satori";
import { html } from "satori-html";
import * as theme from "../styles/theme";

const OG_WIDTH = 2400;
const OG_HEIGHT = 1260;

type VNode = ReturnType<typeof html>;

export interface DefineOgImageHandlerOptions<RouteProps extends Record<string, any>> {
	width: number;
	height: number;
	html: typeof html;
	image: typeof image;
	props: RouteProps;
}

export function defineOgImageHandler<RouteProps extends Record<string, any>>(
	markupFn: (opts: DefineOgImageHandlerOptions<RouteProps>) => VNode | Promise<VNode>,
): APIRoute<RouteProps> {
	return async (ctx: APIContext<RouteProps>) => {
		const markup = await markupFn({
			width: OG_WIDTH,
			height: OG_HEIGHT,
			html,
			image,
			props: ctx.props,
		});

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

		const ogimage = await createImage(markup as ReactNode, { width: OG_WIDTH, height: OG_HEIGHT });
		return new PNGResponse(ogimage);
	};
}

type ContentImage = z.infer<ReturnType<ImageFunction>>;

function image(img: string | ContentImage) {
	const resolvedPath = typeof img === "string" ? img : resolveImage(img.src);
	const buffer = fs.readFileSync(resolvedPath);
	const base64 = btoa(buffer.toString("binary"));

	return `data:image/png;base64,${base64}`;
}

function resolveImage(src: string) {
	if (import.meta.env.DEV) {
		return src.replace("/@fs", "").replace(/\?.*/, "");
	}

	const distDir = path.join(process.cwd(), "./dist");
	return path.join(distDir, "." + src);
}

async function createImage(markup: ReactNode, opts: { width: number; height: number }) {
	console.log(theme.colors);
	const svg = await satori(markup, {
		...opts,
		fonts: [
			{ name: "Ranade", data: ranadeRegularFont, weight: 400 },
			{ name: "Ranade", data: ranadeMediumFont, weight: 500 },
			{ name: "Ranade", data: ranadeBoldFont, weight: 700 },
		],
		tailwindConfig: { theme },
	});

	return toPng(svg);
}

function toPng(svg: string) {
	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return pngData.asPng().buffer as ArrayBuffer;
}

class PNGResponse extends Response {
	constructor(image: ArrayBuffer) {
		super(image, {
			headers: {
				"Content-Type": "image/png",
			},
		});
	}
}

function backgroundPattern(width: number, height: number, density: number = 20) {
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
