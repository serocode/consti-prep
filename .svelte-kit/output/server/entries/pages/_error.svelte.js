import { g as getContext, h as head, e as escape_html } from "../../chunks/index.js";
import "../../chunks/state.svelte.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1j96wlh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Not found · ALAC Consti Practice</title>`);
      });
    });
    $$renderer2.push(`<main class="page"><div class="col"><div class="card" style="padding:32px;text-align:center;display:flex;flex-direction:column;gap:8px;align-items:center"><h1 style="font-size:20px">${escape_html(page.status === 404 ? "That problem doesn’t exist." : "Something went wrong.")}</h1> <p class="muted">${escape_html(page.error?.message)}</p> <a class="btn btn-primary" href="/">All problems</a></div></div></main>`);
  });
}
export {
  _error as default
};
