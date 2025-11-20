// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/seo",
		"@nuxt/content",
		"@nuxtjs/i18n",
		"@nuxt/icon",
		"@nuxt/image",
		"@netlify/nuxt",
	],
	i18n: {
		strategy: "prefix_except_default",
		defaultLocale: "en",
		locales: [
			{ code: "en", language: "en-US", name: "English", file: "en.json" },
			{ code: "zh", language: "zh-TW", name: "Chinese", file: "zh.json" },
		],
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: "i18n_redirected",
			redirectOn: "root",
			fallbackLocale: "en",
			alwaysRedirect: false,
			cookieCrossOrigin: process.env.NODE_ENV === "production",
		},
	},
	seo: {
		redirectToCanonicalSiteUrl: true,
	},
	icon: {
		serverBundle: "remote",
	},
	image: {
		format: ["avif", "webp", "jpg", "png", "gif"],
		quality: 81,
		provider: "none",
	},
	content: {
		renderer: {
			anchorLinks: { h2: true, h3: true, h4: true },
		},
		build: {
			markdown: {
				toc: {
					depth: 3, // include h3 headings
				},
				remarkPlugins: {
					"remark-gfm": {},
					"remark-validate-links": {},
				},
				rehypePlugins: {
					"rehype-external-links": {
						target: "_blank",
						rel: ["nofollow", "noopener", "noreferrer"],
					},
				},
				highlight: {
					theme: {
						default: "vitesse-light",
						dark: "vitesse-dark",
						sepia: "monokai",
					},
				},
			},
		},
	},
	vite: {
		optimizeDeps: {
			exclude: ["@nuxtjs/mdc"],
		},
		build: {
			rollupOptions: {
				treeshake: true,
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							if (id.includes("nitropack")) {
								return "nitropack";
							}
							return "vendor";
						}
					},
					sourcemapExcludeSources: !(process.env.NODE_ENV === "development"), // Set to false to include sources in sourcemaps
				},
			},
			sourcemap: process.env.NODE_ENV === "development" ? true : "hidden",
		},
	},
	nitro: {
		compressPublicAssets: true,
		debug: process.env.NODE_ENV !== "production",
		preset: process.env.NETLIFY ? "netlify" : undefined,
		publicAssets: [
			{
				dir: "public",
			},
		],
		minify: true,
		future: {
			nativeSWR: true,
		},
	},
});
