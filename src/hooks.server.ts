import type { Handle } from '@sveltejs/kit';

/** Fills in absolute URLs for the Open Graph tags (crawlers like Messenger's reject relative image URLs). */
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replaceAll('%site_origin%', event.url.origin)
	});
