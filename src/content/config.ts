import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
	type: "content",
	schema: ({image}) => z.object({
		title: z.string(),
		titleShort: z.string(),
		description: z.string(),
		image: image().refine(img => img.width / img.height === 4/3, {
			message: "Image must have an aspect ration of 4/3!"
		}),
		imageAlt: z.string(),
		lastUpdate: z.date(),
		sortOrder: z.number(),
		featured: z.boolean().default(false),
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
		description: z.array(z.string()),
		start: z.date(),
		end: z.date().optional(),
	}),
});

export const collections = {
	projects: projectCollection,
	education: educationCollection,
	experience: experienceCollection,
};
