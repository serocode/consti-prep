import { ac as ssr_context, a as ensure_array_like, f as attr_class, e as escape_html, c as attr, s as stringify, ad as clsx, d as attr_style, i as derived, h as head } from "../../../../chunks/index.js";
import { m as md, c as PARTS, T as TYPE_TAG, b as TYPE_LABEL, B as BY_PID } from "../../../../chunks/problems.js";
import { B as BANDS, a as BAND_SHORT, s as scoreTag, C as CHECK_ITEMS, f as fixesFor, R as REASONING_ITEM } from "../../../../chunks/rubric.js";
import { d as draftFor, c as attemptsFor, s as store, n as navList, e as setLastScore } from "../../../../chunks/store.svelte.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const SECTIONS = [
  { k: "a", L: "A", title: "Answer", prompt: "What is your direct answer?", placeholder: "Yes or No. State your position clearly…", starters: ["Yes.", "No.", "Valid.", "Invalid."], rows: 2 },
  { k: "l", L: "L", title: "Legal Basis", prompt: "What provision or doctrine supports your answer?", placeholder: "The Constitution provides that…", starters: ["The Constitution provides that ", "Jurisprudence provides that "], rows: 4 },
  { k: "p", L: "A", title: "Application", prompt: "How does the rule apply to these facts?", placeholder: "Here, …", starters: ["Here, ", "This means ", "because "], rows: 7, app: true },
  { k: "c", L: "C", title: "Conclusion", prompt: "What is your final conclusion?", placeholder: "Therefore, …", starters: ["Therefore, "], rows: 2 }
];
function words(s) {
  const t = (s ?? "").trim();
  return t ? t.split(/\s+/).length : 0;
}
function AlacEditor($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { draft, mode } = $$props;
    if (mode === "guided") {
      $$renderer2.push(`<!--[0--><!--[-->`);
      const each_array = ensure_array_like(SECTIONS);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let s = each_array[$$index_1];
        $$renderer2.push(`<section${attr_class("sec card svelte-cynvz0", void 0, { "app": s.app })}><div class="sec-h svelte-cynvz0"><span class="letter svelte-cynvz0" aria-hidden="true">${escape_html(s.L)}</span> <div class="stack" style="gap:2px;flex:1"><label class="sec-t svelte-cynvz0"${attr("for", `f-${stringify(s.k)}`)}>${escape_html(s.title)} `);
        if (s.app) {
          $$renderer2.push(`<!--[0--><span class="tag tag-accent core svelte-cynvz0">Core reasoning</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></label> <span class="muted" style="font-size:14px">${escape_html(s.prompt)}</span></div></div> <textarea${attr("id", `f-${stringify(s.k)}`)}${attr("rows", s.rows)}${attr("placeholder", s.placeholder)}>`);
        const $$body = escape_html(draft[s.k]);
        if ($$body) {
          $$renderer2.push(`${$$body}`);
        }
        $$renderer2.push(`</textarea> <div class="starters svelte-cynvz0"${attr("aria-label", `Sentence starters for ${stringify(s.title)}`)}><!--[-->`);
        const each_array_1 = ensure_array_like(s.starters);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let st = each_array_1[$$index];
          $$renderer2.push(`<button type="button" class="starter svelte-cynvz0">${escape_html(st.trim())}…</button>`);
        }
        $$renderer2.push(`<!--]--></div> <div class="meta svelte-cynvz0"><span class="num">${escape_html(words(draft[s.k]))} words</span></div></section>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push(`<!--[-1--><section class="sec card svelte-cynvz0"><label class="sec-t svelte-cynvz0" for="f-full" style="display:block;margin-bottom:8px">Your answer</label> <textarea id="f-full" rows="16" placeholder="Answer. Legal basis. Application. Conclusion. Write it the way you would in the exam booklet.">`);
      const $$body_1 = escape_html(draft.full);
      if ($$body_1) {
        $$renderer2.push(`${$$body_1}`);
      }
      $$renderer2.push(`</textarea> <div class="meta svelte-cynvz0"><span>A · L · A · C, in that order</span><span class="num">${escape_html(words(draft.full))} words</span></div></section>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function AnswerView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { answer } = $$props;
    if (answer.mode === "full") {
      $$renderer2.push(`<!--[0--><p class="legal txt svelte-g648ex" style="white-space:pre-wrap">${escape_html(answer.full || "(blank)")}</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="stack" style="gap:10px"><!--[-->`);
      const each_array = ensure_array_like(SECTIONS);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let s = each_array[$$index];
        $$renderer2.push(`<div class="row" style="align-items:flex-start;gap:12px"><span class="letter sm"${attr("aria-label", s.title)}>${escape_html(s.L)}</span> `);
        if (answer[s.k]) {
          $$renderer2.push(`<!--[0--><p class="legal txt svelte-g648ex">${escape_html(answer[s.k])}</p>`);
        } else {
          $$renderer2.push(`<!--[-1--><p class="faint txt svelte-g648ex">(blank)</p>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Reference($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { problem, open = false } = $$props;
    $$renderer2.push(`<details class="disc"${attr("open", open, true)}><summary>Reference answer</summary> <div class="disc-b"><!--[-->`);
    const each_array = ensure_array_like(problem.alac);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let line = each_array[i];
      $$renderer2.push(`<div class="row" style="align-items:flex-start;gap:12px"><span class="letter sm">${escape_html("ALAC"[i])}</span> <p class="legal" style="font-size:15.5px;line-height:1.6;min-width:0">${escape_html(line)}</p></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="note note-warn"><strong>Key point.</strong> ${escape_html(problem.key)}</div></div></details> <details class="disc"><summary>Rule and provisions · ${escape_html(problem.c.name)}</summary> <div class="disc-b"><p style="max-width:72ch">${escape_html(problem.c.rule)}</p> <!--[-->`);
    const each_array_1 = ensure_array_like(problem.c.mem);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let m = each_array_1[i];
      $$renderer2.push(`<div class="prov">${escape_html(m)}</div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (problem.c.doc.length) {
      $$renderer2.push(`<!--[0--><ul style="padding-left:20px;display:flex;flex-direction:column;gap:6px"><!--[-->`);
      const each_array_2 = ensure_array_like(problem.c.doc);
      for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
        let d = each_array_2[i];
        $$renderer2.push(`<li>${html(md(d))}</li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <p class="muted" style="font-size:13px">${escape_html(problem.c.cite)}</p></div></details>`);
  });
}
function ScoreScale($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { score, onpick } = $$props;
    const order = [5, 4, 3, 2, 1, 0];
    $$renderer2.push(`<div class="scale svelte-z6h3y0"${attr("role", onpick ? "radiogroup" : void 0)} aria-label="Rubric score"><!--[-->`);
    const each_array = ensure_array_like(order);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let n = each_array[$$index];
      if (onpick) {
        $$renderer2.push(`<!--[0--><button type="button" role="radio"${attr("aria-checked", n === score)}${attr("title", BANDS[n])}${attr_class("svelte-z6h3y0", void 0, { "on": n === score })}><b class="svelte-z6h3y0">${escape_html(n)}</b>${escape_html(BAND_SHORT[n])}</button>`);
      } else {
        $$renderer2.push(`<!--[-1--><div${attr("title", BANDS[n])}${attr_class("svelte-z6h3y0", void 0, { "on": n === score })}><b class="svelte-z6h3y0">${escape_html(n)}</b>${escape_html(BAND_SHORT[n])}</div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Practice($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { problem } = $$props;
    const pid = problem.pid;
    const draft = draftFor(pid);
    const history = derived(() => attemptsFor(pid));
    const latest = derived(() => history()[history().length - 1]);
    const previous = derived(() => history().length > 1 ? history()[history().length - 2] : void 0);
    let phase = attemptsFor(pid).length ? "result" : "write";
    const list = derived(() => navList(pid));
    const idx = derived(() => list().findIndex((p) => p.pid === pid));
    const prev = derived(() => list()[idx() - 1]);
    const next = derived(() => list()[idx() + 1]);
    const revealed = derived(() => phase !== "write" || history().length > 0);
    let started = Date.now();
    let now = Date.now();
    const tick = setInterval(() => now = Date.now(), 1e3);
    onDestroy(() => clearInterval(tick));
    const elapsed = derived(() => Math.max(0, Math.floor((now - started) / 1e3)));
    const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    const lastFixes = derived(() => latest() ? fixesFor(latest().check) : []);
    const checkRows = derived(() => {
      if (!latest()) return [];
      const c = latest().check;
      if (latest().score === 0) return [];
      return c.conclusion ? CHECK_ITEMS.map((i) => ({ label: i.label, ok: c[i.key] })) : [CHECK_ITEMS[0], REASONING_ITEM, CHECK_ITEMS[3]].map((i) => ({ label: i.label, ok: c[i.key] }));
    });
    const when = (t) => new Date(t).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
    $$renderer2.push(`<main class="page"><div class="col"><div class="between wrap"><a class="btn btn-ghost btn-sm" href="/" style="margin-left:-12px">‹ All problems</a> <div class="row"><span class="muted num hide-sm" style="font-size:13px">${escape_html(idx() + 1)} of ${escape_html(list().length)}</span> <a class="btn btn-ghost btn-sm"${attr("href", prev() ? `/p/${prev().pid}` : void 0)}${attr("aria-disabled", !prev())}>‹ Prev</a> <a class="btn btn-ghost btn-sm"${attr("href", next() ? `/p/${next().pid}` : void 0)}${attr("aria-disabled", !next())}>Next ›</a></div></div> <article class="paper card svelte-1wetfa3" aria-labelledby="ptitle"><div class="between wrap" style="margin-bottom:14px"><h1 id="ptitle" class="eyebrow">Problem ${escape_html(problem.no)} · ${escape_html(problem.label)}</h1> <div class="row wrap"><span class="tag tag-line">${escape_html(PARTS[problem.c.part])}</span> <span${attr_class(clsx(TYPE_TAG[problem.type]), "svelte-1wetfa3")}>${escape_html(TYPE_LABEL[problem.type])}</span></div></div> <p class="facts legal svelte-1wetfa3">${escape_html(problem.facts)}</p> `);
    if (problem.q) {
      $$renderer2.push(`<!--[0--><p class="q legal svelte-1wetfa3">${escape_html(problem.q)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (revealed()) {
      $$renderer2.push(`<!--[0--><p class="muted" style="margin-top:14px;font-size:13.5px">Based on <span class="legal" style="font-style:italic;color:var(--text)">${escape_html(problem.c.name)}</span>, ${escape_html(problem.c.cite)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (phase === "write" || phase === "retry") {
      $$renderer2.push("<!--[0-->");
      {
        $$renderer2.push(`<!--[-1--><div style="margin-top:14px"><button class="btn btn-ghost btn-sm" style="margin-left:-12px">Show hint</button></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></article> `);
    if (phase === "write" || phase === "retry") {
      $$renderer2.push("<!--[0-->");
      if (phase === "retry" && latest()) {
        $$renderer2.push(`<!--[0--><section class="card"><details class="disc" style="border-top:0"><summary>Your last attempt · ${escape_html(latest().score)}/5</summary> <div class="disc-b">`);
        AnswerView($$renderer2, { answer: latest().answer });
        $$renderer2.push(`<!----></div></details> `);
        if (lastFixes().length) {
          $$renderer2.push(`<!--[0--><div class="fixes svelte-1wetfa3"><span class="eyebrow">Fix these in your new answer</span> <ul class="svelte-1wetfa3"><!--[-->`);
          const each_array = ensure_array_like(lastFixes());
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let f = each_array[i];
            $$renderer2.push(`<li>${escape_html(f)}</li>`);
          }
          $$renderer2.push(`<!--]--></ul> <p class="muted" style="font-size:13px"><strong>Key point:</strong> ${escape_html(problem.key)}</p></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></section>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="between wrap"><div class="seg" role="group" aria-label="Answer format"><button${attr("aria-pressed", store.prefs.mode === "guided")}>Guided · 4 boxes</button> <button${attr("aria-pressed", store.prefs.mode === "full")}>Full answer</button></div> <span class="muted num" style="font-size:13px">${escape_html(fmt(elapsed()))} elapsed</span></div> `);
      AlacEditor($$renderer2, { draft, mode: store.prefs.mode });
      $$renderer2.push(`<!----> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="card actions svelte-1wetfa3"><button class="btn btn-ghost">Clear</button> <div class="row wrap">`);
      if (phase === "retry") {
        $$renderer2.push(`<!--[0--><button class="btn btn-ghost">Back to result</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button class="btn btn-primary">${escape_html(phase === "retry" ? "Check revised answer" : "Check my answer")}</button></div></div> <p class="faint" style="font-size:12px;text-align:center">Drafts save automatically. Ctrl/⌘ + Enter to check.</p>`);
    } else if (phase === "result" && latest()) {
      $$renderer2.push("<!--[2-->");
      if (previous()) {
        $$renderer2.push("<!--[0-->");
        const d = latest().score - previous().score;
        $$renderer2.push(`<section class="card" aria-label="Compared with your previous attempt"><div class="between wrap" style="padding:14px 20px 10px"><span style="font-weight:600">Attempt ${escape_html(history().length)} vs. attempt ${escape_html(history().length - 1)}</span> <span${attr_class(`${d > 0 ? "tag tag-ok" : d < 0 ? "tag tag-bad" : "tag"} num`)}>${escape_html(d > 0 ? "+" : "")}${escape_html(d)} point${escape_html(Math.abs(d) === 1 ? "" : "s")}</span></div> <div class="cmp svelte-1wetfa3"><div class="svelte-1wetfa3"><span class="muted" style="font-size:12px">Score</span><span class="num"><span class="faint" style="text-decoration:line-through">${escape_html(previous().score)}/5</span> → <strong>${escape_html(latest().score)}/5</strong></span></div> <!--[-->`);
        const each_array_1 = ensure_array_like(CHECK_ITEMS);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let it = each_array_1[$$index_1];
          if (previous().check[it.key] !== latest().check[it.key]) {
            $$renderer2.push(`<!--[0--><div class="svelte-1wetfa3"><span class="muted" style="font-size:12px">${escape_html(it.label)}</span> <strong${attr_style(`color:${latest().check[it.key] ? "var(--success)" : "var(--error)"}`)}>${escape_html(latest().check[it.key] ? "Fixed" : "Slipped")}</strong></div>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></div></section>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <section class="card" aria-label="Score"><div class="scorecard svelte-1wetfa3"><div class="big num svelte-1wetfa3">${escape_html(latest().score)}<small class="svelte-1wetfa3">/ 5</small></div> <div class="stack" style="gap:8px;min-width:0"><strong style="font-size:15px">${escape_html(BANDS[latest().score])}</strong> <div class="row wrap"><span class="tag">Self-checked</span> `);
      if (latest().overridden) {
        $$renderer2.push(`<!--[0--><span class="tag tag-warn">Score adjusted by you</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <span class="tag num">${escape_html(when(latest().at))}</span> `);
      if (latest().secs) {
        $$renderer2.push(`<!--[0--><span class="tag num">${escape_html(fmt(latest().secs))}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div style="grid-column:1/-1">`);
      ScoreScale($$renderer2, { score: latest().score, onpick: (n) => setLastScore(pid, n) });
      $$renderer2.push(`<!----> <p class="muted" style="font-size:12px;margin-top:6px">Tap a band to correct this attempt’s score.</p></div></div> `);
      if (checkRows().length) {
        $$renderer2.push(`<!--[0--><div class="fb svelte-1wetfa3"><h2 class="svelte-1wetfa3">Your checklist</h2> <ul class="checks svelte-1wetfa3"><!--[-->`);
        const each_array_2 = ensure_array_like(checkRows());
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let r = each_array_2[$$index_2];
          $$renderer2.push(`<li class="svelte-1wetfa3"><span${attr_class("ring svelte-1wetfa3", void 0, { "ok": r.ok, "no": !r.ok })}${attr("aria-label", r.ok ? "Met" : "Not met")}></span>${escape_html(r.label)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="fb svelte-1wetfa3"><h2 class="svelte-1wetfa3">What to fix</h2> `);
      if (lastFixes().length) {
        $$renderer2.push(`<!--[0--><ul class="list svelte-1wetfa3"><!--[-->`);
        const each_array_3 = ensure_array_like(lastFixes());
        for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
          let f = each_array_3[i];
          $$renderer2.push(`<li>${escape_html(f)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul>`);
      } else {
        $$renderer2.push(`<!--[-1--><p class="muted">Nothing to fix on the checklist. Try this case’s twist problem next.</p>`);
      }
      $$renderer2.push(`<!--]--> <div class="note note-warn" style="margin-top:12px"><strong>Key point.</strong> ${escape_html(problem.key)}</div></div> <div class="fb cta between wrap svelte-1wetfa3"><div class="stack" style="gap:4px;max-width:52ch"><strong>Try again</strong> <span style="font-size:14px">Rebuild your answer from memory. Your last attempt and the fixes stay visible; the boxes start empty.</span></div> <div class="row wrap"><button class="btn btn-primary btn-lg">Reconstruct my answer</button> `);
      if (next()) {
        $$renderer2.push(`<!--[0--><a class="btn btn-secondary btn-lg"${attr("href", `/p/${stringify(next().pid)}`)}>Next problem</a>`);
      } else {
        $$renderer2.push(`<!--[-1--><a class="btn btn-secondary btn-lg" href="/">All problems</a>`);
      }
      $$renderer2.push(`<!--]--></div></div> `);
      Reference($$renderer2, { problem });
      $$renderer2.push(`<!----> <details class="disc"><summary>Your answer · attempt ${escape_html(history().length)}</summary> <div class="disc-b">`);
      AnswerView($$renderer2, { answer: latest().answer });
      $$renderer2.push(`<!----></div></details> `);
      if (history().length > 1) {
        $$renderer2.push(`<!--[0--><details class="disc"><summary>All attempts (${escape_html(history().length)})</summary> <div class="disc-b"><ol class="hist svelte-1wetfa3"><!--[-->`);
        const each_array_4 = ensure_array_like(history());
        for (let i = 0, $$length = each_array_4.length; i < $$length; i++) {
          let h = each_array_4[i];
          $$renderer2.push(`<li class="svelte-1wetfa3"><span>Attempt ${escape_html(i + 1)} · ${escape_html(when(h.at))}</span><span${attr_class(`${stringify(scoreTag(h.score))} num`, "svelte-1wetfa3")}>${escape_html(h.score)}/5</span></li>`);
        }
        $$renderer2.push(`<!--]--></ol></div></details>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></main>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const problem = derived(() => BY_PID[data.pid]);
    head("18yat49", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Problem ${escape_html(problem().no)} · ALAC Consti Practice</title>`);
      });
    });
    $$renderer2.push(`<!---->`);
    {
      Practice($$renderer2, { problem: problem() });
    }
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
