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
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/p/marcos-drill","/p/marcos-t1","/p/marcos-t2","/p/marcos-t3","/p/risos-drill","/p/risos-t1","/p/risos-t2","/p/risos-t3","/p/trillanes-drill","/p/trillanes-t1","/p/trillanes-t2","/p/trillanes-t3","/p/pangilinan-drill","/p/pangilinan-t1","/p/pangilinan-t2","/p/pangilinan-t3","/p/colmenares-drill","/p/colmenares-t1","/p/colmenares-t2","/p/colmenares-t3","/p/garafil-drill","/p/garafil-t1","/p/garafil-t2","/p/garafil-t3","/p/decastro-drill","/p/decastro-t1","/p/decastro-t2","/p/decastro-t3","/p/belgica-drill","/p/belgica-t1","/p/belgica-t2","/p/belgica-t3","/p/sereno-drill","/p/sereno-t1","/p/sereno-t2","/p/sereno-t3","/p/jardeleza-drill","/p/jardeleza-t1","/p/jardeleza-t2","/p/jardeleza-t3","/p/villanueva-drill","/p/villanueva-t1","/p/villanueva-t2","/p/villanueva-t3","/p/chavez-drill","/p/chavez-t1","/p/chavez-t2","/p/chavez-t3","/p/aguinaldo-drill","/p/aguinaldo-t1","/p/aguinaldo-t2","/p/aguinaldo-t3","/p/recoa-drill","/p/recoa-t1","/p/recoa-t2","/p/recoa-t3","/p/jdf-drill","/p/jdf-t1","/p/jdf-t2","/p/jdf-t3","/p/castaneda-drill","/p/castaneda-t1","/p/castaneda-t2","/p/castaneda-t3","/p/caronan-drill","/p/caronan-t1","/p/caronan-t2","/p/caronan-t3","/p/brillantes-drill","/p/brillantes-t1","/p/brillantes-t2","/p/brillantes-t3","/p/funa-drill","/p/funa-t1","/p/funa-t2","/p/funa-t3","/p/pililla-drill","/p/pililla-t1","/p/pililla-t2","/p/pililla-t3","/p/ppi-drill","/p/ppi-t1","/p/ppi-t2","/p/ppi-t3","/p/penera-drill","/p/penera-t1","/p/penera-t2","/p/penera-t3","/p/seneres-drill","/p/seneres-t1","/p/seneres-t2","/p/seneres-t3","/p/lp-drill","/p/lp-t1","/p/lp-t2","/p/lp-t3","/p/galindo-drill","/p/galindo-t1","/p/galindo-t2","/p/galindo-t3","/p/bsp-drill","/p/bsp-t1","/p/bsp-t2","/p/bsp-t3","/p/miaa-drill","/p/miaa-t1","/p/miaa-t2","/p/miaa-t3","/p/chrea-drill","/p/chrea-t1","/p/chrea-t2","/p/chrea-t3"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
