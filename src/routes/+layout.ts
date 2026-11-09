// Progress lives in localStorage, so pages render in the browser only.
// Prerendering still emits a static HTML shell for every route, which Vercel serves as plain files.
export const prerender = true;
export const ssr = false;
export const trailingSlash = 'never';
