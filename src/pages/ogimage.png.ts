import { defineOgImageHandler } from "@/utils/ogimage";
import { html } from "satori-html";

export const GET = defineOgImageHandler(
	() => html`
		<div tw="w-full h-full flex flex-col justify-center items-center p-12">
			<h1 tw="text-[350px] text-black">Raimund</h1>
			<h2
				tw="mt-8 px-16 py-4 text-[110px] text-white border-8 border-black rounded-full bg-cyan-500"
				style="box-shadow: 25px 25px rgb(0 0 0 / 0.25)"
			>
				Web Developer and UX/UI Designer
			</h2>
		</div>
	`,
);
