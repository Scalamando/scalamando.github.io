import type { APIRoute, GetStaticPaths } from "astro";
import { html } from "satori-html";
import { PNGResponse, createImage, toPng } from "@utils/image";

interface RouteProps {
	width: number;
	height: number;
}

export const GET: APIRoute<RouteProps> = async ({ props }) => {
	const markup = html`
		<div
			tw="w-full h-full flex flex-col justify-center items-center p-12 bg-white"
			style="background-image: url(${bgImage(
				props.width,
				props.height,
			)}); background-size: ${props.width}px ${props.height}px"
		>
			<h1 tw="text-[172px] text-black">Raimund</h1>
			<h2
				tw="px-8 py-4 text-4xl lg:text-[52px] text-white border-4 border-black rounded-full bg-cyan-500"
				style="box-shadow: 12px 12px rgb(0 0 0 / 0.25)"
			>
				Web Developer and UX/UI Designer
			</h2>
		</div>
	`;

	const ogimage = await createImage(markup, { width: props.width, height: props.height });
	return new PNGResponse(toPng(ogimage));
};

export const getStaticPaths: GetStaticPaths = () => {
	return [
		{ params: { id: "twitter" }, props: { width: 1200, height: 675 } },
		{ params: { id: "facebook" }, props: { width: 1200, height: 630 } },
		{ params: { id: "linkedin" }, props: { width: 1200, height: 627 } },
		{ params: { id: "pinterest" }, props: { width: 1000, height: 1500 } },
	];
};

const bgImage = (width: number, height: number) =>
	"data:image/svg+xml;base64," +
	btoa(`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
<pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
<circle cx="10" cy="10" r="2" fill="#0a0a0a44"></circle>
</pattern>
<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
</svg>
`);
