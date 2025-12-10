import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const seoSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	rawbody: z.string(),
});

const commonSchema = z.object({
	title: z.string().optional(),
	seo: seoSchema.optional(),
	rawbody: z.string(),
});

export default defineContentConfig({
	collections: {
		content_en: defineCollection({
			type: "page",
			source: {
				include: "en/**",
				prefix: "",
			},
			schema: commonSchema,
		}),
		content_zh: defineCollection({
			type: "page",
			source: {
				include: "zh/**",
				prefix: "",
			},
			schema: commonSchema,
		}),
	},
});
