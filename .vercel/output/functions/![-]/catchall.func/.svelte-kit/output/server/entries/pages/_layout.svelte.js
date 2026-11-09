import { b as bind_props, a as ensure_array_like, c as attr, e as escape_html } from "../../chunks/index.js";
import { s as store, a as storageStatus } from "../../chunks/store.svelte.js";
function Disclaimer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false } = $$props;
    $$renderer2.push(`<dialog aria-labelledby="disc-title" aria-describedby="disc-body" class="svelte-1rveik1"><div class="box svelte-1rveik1"><h2 id="disc-title" class="svelte-1rveik1">Before you start</h2> <div id="disc-body"><p class="svelte-1rveik1"><b>The review material and the model answers in this app are AI-generated.</b> They may contain mistakes, outdated
				doctrine, misquoted provisions, or wrong case citations.</p> <ul class="svelte-1rveik1"><li>Treat them as a study aid, not as legal authority or legal advice.</li> <li>Verify every rule, article, and case against the Constitution, the decisions themselves, and your professor's materials.</li> <li>If your professor's view differs from the model answer, follow your professor.</li> <li>Your own answer and self-score are saved only in this browser.</li></ul></div> <p class="tip svelte-1rveik1"><b>Best way to use this app:</b> keep pressing <b>Random problem</b> on the home page. On the bar, you won't know which
			question is coming, so don't study the problems in order.</p> <div class="actions svelte-1rveik1"><button class="btn btn-primary">I understand</button></div></div></dialog>`);
    bind_props($$props, { open });
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let showDisclaimer = false;
    const themes = [["system", "Auto"], ["light", "Light"], ["dark", "Dark"]];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<header class="top svelte-12qhfyh"><div class="top-in svelte-12qhfyh"><a class="brand svelte-12qhfyh" href="/" aria-label="ALAC home"><svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="6" style="fill:var(--text)"></rect><rect x="7" y="8" width="14" height="2" rx="1" style="fill:var(--surface)"></rect><rect x="7" y="12" width="10" height="2" rx="1" style="fill:var(--surface)"></rect><rect x="7" y="16" width="14" height="2" rx="1" style="fill:#EA580C"></rect><rect x="7" y="20" width="8" height="2" rx="1" style="fill:var(--surface)"></rect></svg> <span class="stack svelte-12qhfyh"><b class="svelte-12qhfyh">ALAC</b><span class="svelte-12qhfyh">Consti I · Finals practice</span></span></a> <div class="seg" role="group" aria-label="Theme"><!--[-->`);
      const each_array = ensure_array_like(themes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let [value, label] = each_array[$$index];
        $$renderer3.push(`<button${attr("aria-pressed", store.prefs.theme === value)}>${escape_html(label)}</button>`);
      }
      $$renderer3.push(`<!--]--></div></div></header> `);
      if (!storageStatus.ok) {
        $$renderer3.push(`<!--[0--><div class="page" style="padding-block:12px 0"><div class="note note-bad" role="alert">This browser is not saving your progress (private mode or storage is full). Export a backup from the home page before you close the tab.</div></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      children($$renderer3);
      $$renderer3.push(`<!----> <footer class="foot svelte-12qhfyh">All review material and model answers are AI-generated and may contain errors. <button class="btn-link svelte-12qhfyh">Read the disclaimer</button></footer> `);
      Disclaimer($$renderer3, {
        get open() {
          return showDisclaimer;
        },
        set open($$value) {
          showDisclaimer = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _layout as default
};
