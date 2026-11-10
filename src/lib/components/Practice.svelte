<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PARTS, TYPE_LABEL, TYPE_TAG, type Problem } from '$lib/problems';
	import { BANDS, CHECK_ITEMS, REASONING_ITEM, emptyCheck, fixesFor, scoreTag, type Check } from '$lib/rubric';
	import { attemptsFor, draftFor, navList, recordAttempt, setLastScore, store, type Answer, type Attempt } from '$lib/store.svelte';
	import AlacEditor from './AlacEditor.svelte';
	import AnswerView from './AnswerView.svelte';
	import Reference from './Reference.svelte';
	import ScoreScale from './ScoreScale.svelte';
	import SelfCheck from './SelfCheck.svelte';
	import { answerKey } from '$lib/answerkey.svelte';

	let { problem }: { problem: Problem } = $props();

	type Phase = 'write' | 'check' | 'result' | 'retry';

	// The route remounts this component per problem ({#key}), so reading the prop once is intended.
	// svelte-ignore state_referenced_locally
	const pid = problem.pid;
	const draft = draftFor(pid);
	const history = $derived(attemptsFor(pid));
	const latest: Attempt | undefined = $derived(history[history.length - 1]);
	const previous: Attempt | undefined = $derived(history.length > 1 ? history[history.length - 2] : undefined);

	let phase: Phase = $state(attemptsFor(pid).length ? 'result' : 'write');
	let showHint = $state(false);
	let pending: Answer | null = $state(null);
	let blankWarn = $state(false);

	const list = $derived(navList(pid));
	const idx = $derived(list.findIndex((p) => p.pid === pid));
	const prev = $derived(list[idx - 1]);
	const next = $derived(list[idx + 1]);
	const revealed = $derived(phase !== 'write' || history.length > 0 || answerKey.on);

	// elapsed timer while writing
	let started = Date.now();
	let now = $state(Date.now());
	const tick = setInterval(() => (now = Date.now()), 1000);
	onDestroy(() => clearInterval(tick));
	const elapsed = $derived(Math.max(0, Math.floor((now - started) / 1000)));
	const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

	function currentAnswer(): Answer {
		return { mode: store.prefs.mode, ...$state.snapshot(draft) };
	}
	function isBlank(a: Answer) {
		return a.mode === 'full' ? !a.full.trim() : ![a.a, a.l, a.p, a.c].some((x) => x.trim());
	}

	function setMode(m: 'guided' | 'full') {
		if (m === 'full' && !draft.full.trim()) {
			draft.full = [draft.a, draft.l, draft.p, draft.c].map((x) => x.trim()).filter(Boolean).join('\n\n');
		}
		store.prefs.mode = m;
	}

	function submit() {
		const a = currentAnswer();
		if (isBlank(a)) {
			blankWarn = true;
			return;
		}
		blankWarn = false;
		pending = a;
		phase = 'check';
		scrollTop();
	}

	function submitBlank() {
		recordAttempt(pid, { at: Date.now(), secs: elapsed, answer: currentAnswer(), check: emptyCheck(), score: 0 });
		blankWarn = false;
		phase = 'result';
		scrollTop();
	}

	function save(check: Check, score: number, overridden: boolean) {
		if (!pending) return;
		recordAttempt(pid, { at: Date.now(), secs: elapsed, answer: pending, check, score, overridden: overridden || undefined });
		pending = null;
		phase = 'result';
		scrollTop();
	}

	function startRetry() {
		showHint = false;
		started = Date.now();
		phase = 'retry';
		scrollTop();
	}

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const lastFixes = $derived(latest ? fixesFor(latest.check) : []);
	const checkRows = $derived.by(() => {
		if (!latest) return [];
		const c = latest.check;
		if (latest.score === 0) return [];
		return c.conclusion ? CHECK_ITEMS.map((i) => ({ label: i.label, ok: c[i.key] })) : [CHECK_ITEMS[0], REASONING_ITEM, CHECK_ITEMS[3]].map((i) => ({ label: i.label, ok: c[i.key] }));
	});
	const when = (t: number) => new Date(t).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
</script>

<main class="page">
	<div class="col">
		<div class="between wrap">
			<a class="btn btn-ghost btn-sm" href="/" style="margin-left:-12px">‹ All problems</a>
			<div class="row">
				<span class="muted num hide-sm" style="font-size:13px">{idx + 1} of {list.length}</span>
				<a class="btn btn-ghost btn-sm" href={prev ? `/p/${prev.pid}` : undefined} aria-disabled={!prev}>‹ Prev</a>
				<a class="btn btn-ghost btn-sm" href={next ? `/p/${next.pid}` : undefined} aria-disabled={!next}>Next ›</a>
			</div>
		</div>

		<article class="paper card" aria-labelledby="ptitle">
			<div class="between wrap" style="margin-bottom:14px">
				<h1 id="ptitle" class="eyebrow">Problem {problem.no} · {problem.label}</h1>
				<div class="row wrap">
					<span class="tag tag-line">{PARTS[problem.c.part]}</span>
					<span class={TYPE_TAG[problem.type]}>{TYPE_LABEL[problem.type]}</span>
				</div>
			</div>
			<p class="facts legal">{problem.facts}</p>
			{#if problem.q}<p class="q legal">{problem.q}</p>{/if}
			{#if revealed}
				<p class="muted" style="margin-top:14px;font-size:13.5px">
					Based on <span class="legal" style="font-style:italic;color:var(--text)">{problem.c.name}</span>, {problem.c.cite}
				</p>
			{/if}
			{#if phase === 'write' || phase === 'retry'}
				{#if showHint}
					<div class="hint"><span class="eyebrow" style="display:block;margin-bottom:2px">Hint</span>{problem.hint}</div>
				{:else}
					<div style="margin-top:14px"><button class="btn btn-ghost btn-sm" style="margin-left:-12px" onclick={() => (showHint = true)}>Show hint</button></div>
				{/if}
			{/if}
		</article>

		{#if answerKey.on && phase !== 'result'}
			<section class="card keycard" aria-label="Answer key">
				<div class="keyhead"><span class="tag tag-accent">🔑 Answer key</span><span class="muted" style="font-size:13px">Try it yourself first, then compare.</span></div>
				<Reference {problem} open />
			</section>
		{/if}

		{#if phase === 'write' || phase === 'retry'}
			{#if phase === 'retry' && latest}
				<section class="card">
					<details class="disc" style="border-top:0">
						<summary>Your last attempt · {latest.score}/5</summary>
						<div class="disc-b"><AnswerView answer={latest.answer} /></div>
					</details>
					{#if lastFixes.length}
						<div class="fixes">
							<span class="eyebrow">Fix these in your new answer</span>
							<ul>{#each lastFixes as f, i (i)}<li>{f}</li>{/each}</ul>
							<p class="muted" style="font-size:13px"><strong>Key point:</strong> {problem.key}</p>
						</div>
					{/if}
				</section>
			{/if}

			<div class="between wrap">
				<div class="seg" role="group" aria-label="Answer format">
					<button aria-pressed={store.prefs.mode === 'guided'} onclick={() => setMode('guided')}>Guided · 4 boxes</button>
					<button aria-pressed={store.prefs.mode === 'full'} onclick={() => setMode('full')}>Full answer</button>
				</div>
				<span class="muted num" style="font-size:13px">{fmt(elapsed)} elapsed</span>
			</div>

			<AlacEditor {draft} mode={store.prefs.mode} onsubmit={submit} />

			{#if blankWarn}
				<div class="note note-warn" role="alert">
					Your answer is empty. A blank answer scores 0.
					<div class="row wrap" style="margin-top:8px">
						<button class="btn btn-secondary btn-sm" onclick={() => (blankWarn = false)}>Keep writing</button>
						<button class="btn btn-ghost btn-sm" onclick={submitBlank}>Record a 0</button>
					</div>
				</div>
			{/if}

			<div class="card actions">
				<button class="btn btn-ghost" onclick={() => { draft.a = draft.l = draft.p = draft.c = draft.full = ''; }}>Clear</button>
				<div class="row wrap">
					{#if phase === 'retry'}<button class="btn btn-ghost" onclick={() => (phase = 'result')}>Back to result</button>{/if}
					<button class="btn btn-primary" onclick={submit}>{phase === 'retry' ? 'Check revised answer' : 'Check my answer'}</button>
				</div>
			</div>
			<p class="faint" style="font-size:12px;text-align:center">Drafts save automatically. Ctrl/⌘ + Enter to check.</p>
		{:else if phase === 'check' && pending}
			<SelfCheck {problem} answer={pending} onsave={save} oncancel={() => { phase = history.length ? 'retry' : 'write'; pending = null; }} />
		{:else if phase === 'result' && latest}
			{#if previous}
				{@const d = latest.score - previous.score}
				<section class="card" aria-label="Compared with your previous attempt">
					<div class="between wrap" style="padding:14px 20px 10px">
						<span style="font-weight:600">Attempt {history.length} vs. attempt {history.length - 1}</span>
						<span class="{d > 0 ? 'tag tag-ok' : d < 0 ? 'tag tag-bad' : 'tag'} num">{d > 0 ? '+' : ''}{d} point{Math.abs(d) === 1 ? '' : 's'}</span>
					</div>
					<div class="cmp">
						<div><span class="muted" style="font-size:12px">Score</span><span class="num"><span class="faint" style="text-decoration:line-through">{previous.score}/5</span> → <strong>{latest.score}/5</strong></span></div>
						{#each CHECK_ITEMS as it (it.key)}
							{#if previous.check[it.key] !== latest.check[it.key]}
								<div>
									<span class="muted" style="font-size:12px">{it.label}</span>
									<strong style="color:{latest.check[it.key] ? 'var(--success)' : 'var(--error)'}">{latest.check[it.key] ? 'Fixed' : 'Slipped'}</strong>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<section class="card" aria-label="Score">
				<div class="scorecard">
					<div class="big num">{latest.score}<small>/ 5</small></div>
					<div class="stack" style="gap:8px;min-width:0">
						<strong style="font-size:15px">{BANDS[latest.score]}</strong>
						<div class="row wrap">
							<span class="tag">Self-checked</span>
							{#if latest.overridden}<span class="tag tag-warn">Score adjusted by you</span>{/if}
							<span class="tag num">{when(latest.at)}</span>
							{#if latest.secs}<span class="tag num">{fmt(latest.secs)}</span>{/if}
						</div>
					</div>
					<div style="grid-column:1/-1">
						<ScoreScale score={latest.score} onpick={(n) => setLastScore(pid, n)} />
						<p class="muted" style="font-size:12px;margin-top:6px">Tap a band to correct this attempt’s score.</p>
					</div>
				</div>

				{#if checkRows.length}
					<div class="fb">
						<h2>Your checklist</h2>
						<ul class="checks">
							{#each checkRows as r (r.label)}
								<li><span class="ring" class:ok={r.ok} class:no={!r.ok} aria-label={r.ok ? 'Met' : 'Not met'}></span>{r.label}</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="fb">
					<h2>What to fix</h2>
					{#if lastFixes.length}
						<ul class="list">{#each lastFixes as f, i (i)}<li>{f}</li>{/each}</ul>
					{:else}
						<p class="muted">Nothing to fix on the checklist. Try this case’s twist problem next.</p>
					{/if}
					<div class="note note-warn" style="margin-top:12px"><strong>Key point.</strong> {problem.key}</div>
				</div>

				<div class="fb cta between wrap">
					<div class="stack" style="gap:4px;max-width:52ch">
						<strong>Try again</strong>
						<span style="font-size:14px">Rebuild your answer from memory. Your last attempt and the fixes stay visible; the boxes start empty.</span>
					</div>
					<div class="row wrap">
						<button class="btn btn-primary btn-lg" onclick={startRetry}>Reconstruct my answer</button>
						{#if next}<a class="btn btn-secondary btn-lg" href="/p/{next.pid}">Next problem</a>{:else}<a class="btn btn-secondary btn-lg" href="/">All problems</a>{/if}
					</div>
				</div>

				<Reference {problem} open={answerKey.on} />
				<details class="disc">
					<summary>Your answer · attempt {history.length}</summary>
					<div class="disc-b"><AnswerView answer={latest.answer} /></div>
				</details>
				{#if history.length > 1}
					<details class="disc">
						<summary>All attempts ({history.length})</summary>
						<div class="disc-b">
							<ol class="hist">
								{#each history as h, i (h.at)}
									<li><span>Attempt {i + 1} · {when(h.at)}</span><span class="{scoreTag(h.score)} num">{h.score}/5</span></li>
								{/each}
							</ol>
						</div>
					</details>
				{/if}
			</section>
		{/if}
	</div>
</main>

<style>
	.keycard {
		border-color: var(--accent-line);
		overflow: hidden;
	}
	.keyhead {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		padding: 12px 24px;
	}
	.keycard :global(details.disc:first-of-type) {
		border-top: 1px solid var(--border);
	}
	.paper {
		padding: 26px 30px;
	}
	@media (max-width: 640px) {
		.keyhead {
			padding: 12px 16px;
		}
	}
	.facts {
		font-size: 18px;
		line-height: 1.7;
		max-width: 68ch;
	}
	.q {
		font-size: 18px;
		font-weight: 600;
		margin-top: 12px;
	}
	.hint {
		margin-top: 16px;
		padding: 12px 14px;
		border-radius: 6px;
		background: var(--surface-2);
		font-size: 14px;
	}
	.fixes {
		padding: 4px 24px 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.fixes ul,
	.list {
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: 72ch;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 12px 16px;
	}
	.cmp {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(170px, 100%), 1fr));
		gap: 1px;
		background: var(--border);
		border-top: 1px solid var(--border);
	}
	.cmp > div {
		background: var(--surface);
		padding: 12px 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.scorecard {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 18px 24px;
		padding: 24px;
		align-items: center;
	}
	.big {
		font-size: 56px;
		line-height: 1;
		font-weight: 600;
		letter-spacing: -0.03em;
	}
	.big small {
		font-size: 16px;
		color: var(--text-2);
		margin-left: 4px;
		letter-spacing: 0;
	}
	.fb {
		padding: 20px 24px;
		border-top: 1px solid var(--border);
	}
	.fb h2 {
		font-size: 14.5px;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.cta {
		background: var(--accent-soft);
	}
	.checks {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.checks li {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		font-size: 14px;
	}
	.ring {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		flex: none;
		margin-top: 2px;
		border: 1.5px solid var(--border-strong);
	}
	.ring.ok {
		border-color: var(--success);
		background: var(--success);
		box-shadow: inset 0 0 0 3px var(--surface);
	}
	.ring.no {
		border-color: var(--error);
		background: var(--error-soft);
	}
	.hist {
		padding-left: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.hist li {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-size: 14px;
	}
	@media (max-width: 640px) {
		.paper {
			padding: 20px 18px;
		}
		.facts,
		.q {
			font-size: 16.5px;
		}
		.scorecard {
			grid-template-columns: 1fr;
			padding: 18px;
		}
		.fb {
			padding: 18px 16px;
		}
		.fixes {
			padding: 4px 16px 16px;
		}
	}
</style>
