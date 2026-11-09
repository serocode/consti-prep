import { h as head, e as escape_html, c as attr, s as stringify, d as attr_style, a as ensure_array_like, f as attr_class, i as derived } from "../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
import { P as PROBLEMS, a as PART_SHORT, T as TYPE_TAG, b as TYPE_LABEL, c as PARTS } from "../../chunks/problems.js";
import { s as scoreTag } from "../../chunks/rubric.js";
import { s as store, b as bestScore, c as attemptsFor, f as filteredProblems } from "../../chunks/store.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const list = derived(filteredProblems);
    const answered = derived(() => PROBLEMS.filter((p) => bestScore(p.pid) >= 0));
    const scores = derived(() => answered().map((p) => bestScore(p.pid)));
    const avg = derived(() => scores().length ? scores().reduce((a, b) => a + b, 0) / scores().length : 0);
    const next = derived(() => list().find((p) => bestScore(p.pid) < 0) ?? list()[0]);
    const groups = derived(() => {
      const out = [];
      for (const p of list()) {
        const g = out[out.length - 1];
        if (g && g.c === p.c) g.items.push(p);
        else out.push({ c: p.c, items: [p] });
      }
      return out;
    });
    const partStats = derived(() => [1, 2, 3, 4].map((n) => {
      const ps = PROBLEMS.filter((p) => p.c.part === n);
      return {
        n,
        name: PARTS[n],
        total: ps.length,
        done: ps.filter((p) => bestScore(p.pid) >= 0).length
      };
    }));
    const filters = [
      {
        key: "part",
        label: "Part",
        opts: [
          ["all", "All parts"],
          ["1", "I · President"],
          ["2", "II · Budget"],
          ["3", "III · Judiciary"],
          ["4", "IV · Commissions"]
        ]
      },
      {
        key: "type",
        label: "Type",
        opts: [
          ["all", "All types"],
          ["drill", "Case drills"],
          ["same", "Same rule"],
          ["twist", "Twists"]
        ]
      },
      {
        key: "status",
        label: "Status",
        opts: [["all", "All"], ["new", "Not yet"], ["weak", "Below 4"]]
      }
    ];
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>ALAC Consti Practice</title>`);
      });
    });
    $$renderer2.push(`<main class="page"><div class="between wrap intro svelte-1uha8ag"><div class="stack" style="gap:6px"><h1 class="svelte-1uha8ag">Answer the way the bar grades you.</h1> <p class="muted" style="max-width:62ch">${escape_html(PROBLEMS.length)} problems from your Consti I finals coverage: 28 case drills and 84 twin problems. Write in ALAC, check yourself against the reference and the 0–5 rubric, then rebuild your answer.</p></div> <div class="row wrap"><button class="btn btn-secondary">Random problem</button> `);
    if (next()) {
      $$renderer2.push(`<!--[0--><a class="btn btn-primary"${attr("href", `/p/${stringify(next().pid)}`)}>${escape_html(answered().length ? "Continue" : "Start practicing")}</a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <section class="kpis card svelte-1uha8ag" aria-label="Your progress"><div class="kpi svelte-1uha8ag"><span class="k svelte-1uha8ag">Answered</span> <b class="svelte-1uha8ag">${escape_html(answered().length)}<small class="svelte-1uha8ag">/ ${escape_html(PROBLEMS.length)}</small></b> <div class="bar"><i${attr_style(`width:${stringify(answered().length / PROBLEMS.length * 100)}%`)}></i></div></div> <div class="kpi svelte-1uha8ag"><span class="k svelte-1uha8ag">Average best score</span> <b class="svelte-1uha8ag">${escape_html(scores().length ? avg().toFixed(1) : "—")}<small class="svelte-1uha8ag">/ 5</small></b> <span class="s svelte-1uha8ag">${escape_html(scores().length ? "Across answered problems" : "Answer one to see it")}</span></div> <div class="kpi svelte-1uha8ag"><span class="k svelte-1uha8ag">Scored 5</span> <b class="svelte-1uha8ag">${escape_html(scores().filter((s) => s === 5).length)}</b> <span class="s svelte-1uha8ag">Correct, right bases, polished</span></div> <div class="kpi svelte-1uha8ag"><span class="k svelte-1uha8ag">Below 4</span> <b class="svelte-1uha8ag">${escape_html(scores().filter((s) => s < 4).length)}</b> <span class="s svelte-1uha8ag">Worth another attempt</span></div></section> <div class="parts svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(partStats());
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let ps = each_array[$$index];
      $$renderer2.push(`<button class="card part svelte-1uha8ag"${attr("aria-label", `Show ${stringify(ps.name)}`)}><span class="between"><span class="pn svelte-1uha8ag">${escape_html(ps.name)}</span><span class="muted num" style="font-size:12px">${escape_html(ps.done)}/${escape_html(ps.total)}</span></span> <span class="bar"><i${attr_style(`width:${stringify(ps.done / ps.total * 100)}%`)}></i></span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="filters svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(filters);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let f = each_array_1[$$index_2];
      $$renderer2.push(`<div class="seg" role="group"${attr("aria-label", f.label)}><!--[-->`);
      const each_array_2 = ensure_array_like(f.opts);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let [v, label] = each_array_2[$$index_1];
        $$renderer2.push(`<button${attr("aria-pressed", store.prefs[f.key] === v)}>${escape_html(label)}</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (!list().length) {
      $$renderer2.push(`<!--[0--><div class="card empty svelte-1uha8ag"><p style="font-weight:600">No problems match these filters.</p> <p class="muted">${escape_html(store.prefs.status === "weak" ? "Nothing below 4 here." : "Try another part or type.")}</p></div>`);
    } else {
      $$renderer2.push(`<!--[-1--><!--[-->`);
      const each_array_3 = ensure_array_like(groups());
      for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
        let g = each_array_3[$$index_4];
        $$renderer2.push(`<section class="card group svelte-1uha8ag"><div class="group-h svelte-1uha8ag"><span class="tag tag-line">${escape_html(PART_SHORT[g.c.part])}</span> <h2 class="svelte-1uha8ag">${escape_html(g.c.name)}</h2> <span class="muted cite hide-sm svelte-1uha8ag">${escape_html(g.c.cite)}</span></div> <ul class="svelte-1uha8ag"><!--[-->`);
        const each_array_4 = ensure_array_like(g.items);
        for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
          let p = each_array_4[$$index_3];
          const b = bestScore(p.pid);
          const n = attemptsFor(p.pid).length;
          $$renderer2.push(`<li><a class="prow svelte-1uha8ag"${attr("href", `/p/${stringify(p.pid)}`)}><span class="muted num no svelte-1uha8ag">${escape_html(p.no)}</span> <span class="lbl svelte-1uha8ag">${escape_html(p.label)}</span> <span${attr_class(`${stringify(TYPE_TAG[p.type])} hide-sm`, "svelte-1uha8ag")}>${escape_html(TYPE_LABEL[p.type])}</span> `);
          if (b >= 0) {
            $$renderer2.push(`<!--[0--><span${attr_class(`${stringify(scoreTag(b))} pill num`, "svelte-1uha8ag")}${attr("title", `Best of ${stringify(n)} attempt${n > 1 ? "s" : ""}`)}>${escape_html(b)}/5</span>`);
          } else {
            $$renderer2.push(`<!--[-1--><span class="tag pill svelte-1uha8ag">New</span>`);
          }
          $$renderer2.push(`<!--]--></a></li>`);
        }
        $$renderer2.push(`<!--]--></ul></section>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> <section class="card backup svelte-1uha8ag" aria-labelledby="bk"><div class="stack" style="gap:2px"><h2 id="bk" class="svelte-1uha8ag">Backup</h2> <p class="muted" style="font-size:13.5px">Progress is saved in this browser only. Export it to move to another device, then import it there.</p> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="row wrap"><button class="btn btn-secondary btn-sm">Export progress</button> <button class="btn btn-secondary btn-sm">Import</button> <input type="file" accept="application/json,.json" hidden=""/> `);
    {
      $$renderer2.push(`<!--[-1--><button class="btn btn-ghost btn-sm">Clear progress</button>`);
    }
    $$renderer2.push(`<!--]--></div></section></main>`);
  });
}
export {
  _page as default
};
