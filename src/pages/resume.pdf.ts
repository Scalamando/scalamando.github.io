import ReactPDF from "@react-pdf/renderer";
import ResumePDF from "../components/ResumePDF";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
	const experiences = await getCollection("experience");
	experiences.sort((a, b) => b.data.start.getTime() - a.data.start.getTime());

	const projects = await getCollection("projects");
	const resumeProjects = projects
		.filter((project) => project.data.inResume)
		.sort((a, b) => a.data.sortOrder - b.data.sortOrder);

	const pdfStream = await ReactPDF.renderToStream(
		ResumePDF({
			experiences,
			projects: resumeProjects,
			site: site ?? new URL("http://localhost:4321"),
		}),
	);
	const pdf = await streamToBuffer(pdfStream);

	return new Response(pdf, {
		headers: {
			"Content-Type": "application/pdf",
		},
	});
};

async function streamToBuffer(stream: NodeJS.ReadableStream) {
	const chunks: Array<any> = [];

	for await (const chunk of stream) {
		chunks.push(chunk);
	}

	return Buffer.concat(chunks);
}
