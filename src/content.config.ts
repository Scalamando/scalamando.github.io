import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const projectCollection = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			titleShort: z.string(),
			description: z.string(),
			image: image(),
			imageAlt: z.string(),
			lastUpdate: z.date(),
			sortOrder: z.number(),
			featured: z.boolean().default(false),
		}),
});

const educationCollection = defineCollection({
	loader: glob({ base: "./src/content/education", pattern: "**/*.{yml,yaml}" }),
	schema: z.object({
		institution: z.string(),
		major: z.string(),
		degree: z.string(),
		start: z.date(),
		end: z.date(),
	}),
});

const experienceCollection = defineCollection({
	loader: glob({ base: "./src/content/experience", pattern: "**/*.{yml,yaml}" }),
	schema: z.object({
		type: z.string(),
		company: z.string(),
		position: z.string(),
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
