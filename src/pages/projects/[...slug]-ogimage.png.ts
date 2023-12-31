import { defineOgImageHandler } from "@/utils/ogimage";
import { getCollection, type CollectionEntry } from "astro:content";

interface RouteProps {
	project: CollectionEntry<"projects">;
}
export const GET = defineOgImageHandler<RouteProps>(
	({ props, html, image }) => html`
		<div tw="flex items-start w-full h-full p-16 pb-52">
			<div
				tw="flex w-full rounded-[48px] p-12 bg-white border-4 border-black"
				style="box-shadow: 25px 25px rgb(0 0 0 / 0.25)"
			>
				<img src="${image(props.project.data.image)}" tw="w-[49%] rounded-3xl" />
				<div tw="flex flex-col w-[49%] ml-[2%]">
					<h1 tw="text-[110px] text-black mt-0">${props.project.data.title}</h1>
					<p tw="text-5xl leading-normal" style="display: block; line-clamp: 8">
						${props.project.data.description}
					</p>
				</div>
			</div>
		</div>
		<div tw="absolute bottom-2 w-full flex justify-between text-6xl px-20 font-medium">
			<p>Raimund Canzler</p>
			<p>Web Developer and UX/UI Designer</p>
		</div>
	`,
);

export async function getStaticPaths() {
	const projects = await getCollection("projects");
	return projects.map((project) => ({
		params: { slug: project.slug },
		props: { project },
	}));
}
