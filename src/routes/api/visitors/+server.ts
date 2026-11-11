import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis';
import type { RequestHandler } from './$types';

// The only server code in the app: a public visitor count. Everything else is prerendered static files.
export const prerender = false;

const KEY = 'visitors';
// Vercel's edge keeps the count for a minute to spare database reads; browsers always ask the edge, so no one sees a stale
// copy of their own.
const CACHE = 'public, max-age=0, s-maxage=60, stale-while-revalidate=300';

// Vercel's Upstash integration sets KV_REST_API_*; a direct Upstash database uses UPSTASH_REDIS_REST_*.
const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

/** Current count, or null when no database is connected (the footer then hides the counter). */
export const GET: RequestHandler = async () => {
	if (!redis) return json({ visitors: null });
	try {
		return json({ visitors: Number((await redis.get<number>(KEY)) ?? 0) }, { headers: { 'cache-control': CACHE } });
	} catch {
		return json({ visitors: null });
	}
};

/**
 * Counts one new visitor. The browser calls this once, then remembers it in localStorage, so no id or cookie is
 * involved. Only same-origin requests count, which stops casual inflation from other sites (not a determined script).
 */
export const POST: RequestHandler = async ({ request, url: reqUrl }) => {
	if (!redis) return json({ visitors: null });
	const origin = request.headers.get('origin');
	if (origin && origin !== reqUrl.origin) return json({ error: 'cross-origin' }, { status: 403 });
	try {
		return json({ visitors: await redis.incr(KEY) });
	} catch {
		return json({ visitors: null });
	}
};
