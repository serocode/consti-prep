import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
// Prerendered pages need a real origin so the Open Graph image URL is absolute.
// Vercel sets VERCEL_PROJECT_PRODUCTION_URL; set SITE_URL (e.g. https://your-app.vercel.app) to override.
const origin =
	process.env.SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Every page is prerendered (see src/routes/+layout.ts), so Vercel serves static files only.
		adapter: adapter(),
		prerender: origin ? { origin } : {}
	}
};

export default config;
