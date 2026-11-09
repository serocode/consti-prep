

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false,
  "trailingSlash": "never"
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Cj_iC_RI.js","_app/immutable/chunks/Dky_dCHQ.js","_app/immutable/chunks/CsNazaRa.js","_app/immutable/chunks/_Q4zH5Az.js","_app/immutable/chunks/CegewaxS.js","_app/immutable/chunks/De1yfujs.js"];
export const stylesheets = ["_app/immutable/assets/0.AFd3pfQA.css"];
export const fonts = [];
