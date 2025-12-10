import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { asSeoCollection } from "@nuxtjs/seo/content";

const seoSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
});

const commonSchema = z.object({
	title: z.string().optional(),
	seo: seoSchema.optional(),
});

export default defineContentConfig({
	collections: {
		content_en: defineCollection(
			asSeoCollection({
				type: "page",
				source: {
					include: "en/**",
					prefix: "",
				},
				schema: commonSchema,
			})
		),
		content_zh: defineCollection(
			asSeoCollection({
				type: "page",
				source: {
					include: "zh/**",
					prefix: "",
				},
				schema: commonSchema,
			})
		),
	},
});
