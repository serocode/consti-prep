
import root from '../root.js';
import { set_building, set_prerendering } from '$app/env/internal';
import { set_assets } from '$app/paths/internal/server';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env } from '../../../node_modules/.pnpm/@sveltejs+kit@2.70.4_@sveltejs+vite-plugin-svelte@6.2.4_svelte@5.57.3_vite@7.3.8__svelt_acd392ad59f7c306d2b398efa551b4e8/node_modules/@sveltejs/kit/src/runtime/shared-server.js';
import error from '../shared/error-template.js';

export const options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	service_worker_options: undefined,
	server_error_boundaries: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n\t\t<meta name=\"description\" content=\"Practice Consti I finals problems in the ALAC format and check yourself against the bar's 0–5 rubric.\" />\n\t\t<meta property=\"og:type\" content=\"website\" />\n\t\t<meta property=\"og:site_name\" content=\"ALAC Consti Practice\" />\n\t\t<meta property=\"og:title\" content=\"ALAC · Consti I Finals practice\" />\n\t\t<meta\n\t\t\tproperty=\"og:description\"\n\t\t\tcontent=\"Practice random bar-style problems in the Answer, Legal Basis, Application, Conclusion format and self-check against the 0–5 rubric. Review material is AI-generated; verify before relying on it.\"\n\t\t/>\n\t\t<meta property=\"og:url\" content=\"%site_origin%/\" />\n\t\t<meta property=\"og:image\" content=\"%site_origin%/og.png\" />\n\t\t<meta property=\"og:image:type\" content=\"image/png\" />\n\t\t<meta property=\"og:image:width\" content=\"1200\" />\n\t\t<meta property=\"og:image:height\" content=\"630\" />\n\t\t<meta property=\"og:image:alt\" content=\"ALAC Consti I Finals practice\" />\n\t\t<meta name=\"twitter:card\" content=\"summary_large_image\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.svg\" type=\"image/svg+xml\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin=\"anonymous\" />\n\t\t<link\n\t\t\trel=\"stylesheet\"\n\t\t\thref=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap\"\n\t\t/>\n\t\t<script>\n\t\t\t// Apply the saved theme before first paint to avoid a flash.\n\t\t\ttry {\n\t\t\t\tvar s = JSON.parse(localStorage.getItem('alac-consti:v1') || '{}');\n\t\t\t\tvar t = s && s.prefs && s.prefs.theme;\n\t\t\t\tif (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);\n\t\t\t} catch (e) {}\n\t\t</script>\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n",
		error
	},
	version_hash: "72h1ap"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	({ handle, handleFetch, handleError, handleValidationError, init } = await import("../../../src/hooks.server.ts"));

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation };
