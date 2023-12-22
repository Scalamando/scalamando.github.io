import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		titleShort: z.string(),
		description: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		lastUpdate: z.date(),
		sortOrder: z.number(),
	}),
});

const educationCollection = defineCollection({
	type: "data",
	schema: z.object({
		institution: z.string(),
		major: z.string(),
		degree: z.string(),
		start: z.date(),
		end: z.date(),
	}),
});

const experienceCollection = defineCollection({
	type: "data",
	schema: z.object({
		company: z.string(),
		title: z.string(),
		description: z.string(),
		start: z.date(),
		end: z.date().optional(),
	}),
});

export const collections = {
	projects: projectCollection,
	education: educationCollection,
	experience: experienceCollection,
};
