import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Every page is prerendered (see src/routes/+layout.ts), so Vercel serves static files only.
		adapter: adapter()
	}
};

export default config;
