export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","og.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.D3wFF3z-.js",app:"_app/immutable/entry/app.Do_hwgi0.js",imports:["_app/immutable/entry/start.D3wFF3z-.js","_app/immutable/chunks/BBbXKiSK.js","_app/immutable/chunks/CsNazaRa.js","_app/immutable/chunks/DmEYoeKt.js","_app/immutable/chunks/CgakNXDJ.js","_app/immutable/chunks/B0XwC4Ot.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.Do_hwgi0.js","_app/immutable/chunks/CsNazaRa.js","_app/immutable/chunks/Dky_dCHQ.js","_app/immutable/chunks/CgakNXDJ.js","_app/immutable/chunks/_Q4zH5Az.js","_app/immutable/chunks/De1yfujs.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/p/[pid]",
				pattern: /^\/p\/([^/]+?)\/?$/,
				params: [{"name":"pid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
