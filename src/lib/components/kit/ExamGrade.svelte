<script lang="ts">
	import ScoreScale from '../ScoreScale.svelte';
	import { fmtTime } from '$lib/crimpro-exam';
	import type { Kit } from '$lib/kit';
	import { endExam, enumOf, finishGrading, itemKey, maxPoints, pointsFor, probOf, termOf, tickKey, totals, unmarked, TERM_POINTS } from '$lib/kit-exam';
	import type { KitExam, KitItem } from '$lib/store.svelte';

	let { kit, x }: { kit: Kit; x: KitExam } = $props();

	const t = $derived(totals(kit, x));
	const left = $derived(unmarked(x));
	const pct = $derived(t.total ? Math.round((t.score / t.total) * 100) : 0);
	const secs = $derived(((x.finished ?? x.started) - x.started) / 1000);
	const PART: Record<KitItem['kind'], string> = { enum: 'I. Enumeration', term: 'II. Definition of terms', prob: 'III. Problems' };
	const kinds = $derived((['enum', 'term', 'prob'] as const).filter((k) => x.items.some((it) => it.kind === k)));
	const termOpts: [number, string][] = [
		[TERM_POINTS, 'Got it'],
		[1, 'Partly'],
		[0, 'Missed']
	];

	const mine = (it: KitItem, s?: string) => x.answers[s ? `${itemKey(it)}:${s}` : itemKey(it)]?.trim() ?? '';
	function finish() {
		finishGrading(kit);
		window.scrollTo(0, 0);
	}
</script>

<div class="col" style="max-width:860px;margin:0">
	{#if x.graded}
		<section class="card head">
			<span class="eyebrow">{x.label}</span>
			<div class="score">
				<b class="num">{t.score}<small>/ {t.total}</small></b>
				<span class="tag num {pct >= 75 ? 'tag-ok' : pct >= 50 ? 'tag-warn' : 'tag-bad'}">{pct}%</span>
			</div>
			<p class="muted num" style="font-size:13.5px">{fmtTime(secs)} spent writing</p>
			<div class="parts">
				{#each kinds as k (k)}
					<div><span class="muted">{PART[k]}</span><b class="num">{t.part[k].got}/{t.part[k].max}</b></div>
				{/each}
			</div>
			<div class="row wrap" style="margin-top:8px">
				<button class="btn btn-primary" onclick={() => endExam(kit)}>New exam</button>
				<a class="btn btn-secondary" href="{kit.base}/drill">Flashcards: drill what you missed</a>
			</div>
		</section>
		<p class="muted" style="font-size:13.5px">Your marks below are saved. Enumerations and definitions you missed are now rated Blank or Shaky in the flashcards.</p>
	{:else}
		<section class="card head">
			<span class="eyebrow">Check your answers</span>
			<h2 class="h">Mark yourself against the model</h2>
			<p class="muted" style="font-size:14px">
				Be strict. For each enumeration, tick only the items you named <i>and</i> explained.
				For each problem, use the same 0–5 rubric as the ALAC practice.
			</p>
		</section>
	{/if}

	{#each kinds as k (k)}
		<h2 class="ph">{PART[k]}</h2>
		{#each x.items.filter((it) => it.kind === k) as it, n (it.id)}
			{@const pts = pointsFor(kit, x, it)}
			<section class="card item">
				<div class="between" style="align-items:flex-start">
					<p class="qt legal">
						<span class="num" style="font-weight:600">{n + 1}.</span>
						{#if it.kind === 'enum'}{enumOf(kit, it).t}{:else if it.kind === 'term'}Define: <b>{termOf(kit, it).t}</b>{:else}{probOf(kit, it).label}{/if}
					</p>
					<span class="tag num {pts == null ? 'tag-line' : pts === maxPoints(kit, it) ? 'tag-ok' : pts > 0 ? 'tag-warn' : 'tag-bad'}">
						{pts == null ? '–' : pts}/{maxPoints(kit, it)}
					</span>
				</div>

				{#if it.kind === 'prob'}
					<p class="facts legal">{probOf(kit, it).facts}{#if probOf(kit, it).q} <b>{probOf(kit, it).q}</b>{/if}</p>
				{/if}

				<div class="two">
					<div class="pane mine">
						<span class="eyebrow">Your answer</span>
						{#if it.kind === 'prob'}
							{#each ['a', 'l', 'p', 'c'] as s, i (s)}
								<p><b>{'ALAC'[i]}.</b> {mine(it, s) || '(blank)'}</p>
							{/each}
						{:else}
							<p class="pre">{mine(it) || '(blank)'}</p>
						{/if}
					</div>
					<div class="pane ref">
						<span class="eyebrow">Model</span>
						{#if it.kind === 'enum'}
							{@const e = enumOf(kit, it)}
							<p class="muted" style="font-size:13px">There are {e.it.length}{e.order ? ', in this order' : ''}. Memory aid: {e.mem}</p>
							<ol class="ticks">
								{#each e.it as [item, why], i (i)}
									<li>
										<label>
											<input
												type="checkbox"
												disabled={x.graded}
												checked={x.marks[tickKey(it, i)] === 1}
												onchange={(ev) => (x.marks[tickKey(it, i)] = (ev.currentTarget as HTMLInputElement).checked ? 1 : 0)}
											/>
											<span><b>{item}</b> — {why}</span>
										</label>
									</li>
								{/each}
							</ol>
						{:else if it.kind === 'term'}
							{@const term = termOf(kit, it)}
							<p>{term.d}</p>
							{#if term.x}<p class="muted" style="font-size:13px"><b>Don’t confuse:</b> {term.x}</p>{/if}
						{:else}
							{#each probOf(kit, it).alac as line, i (i)}<p><b>{'ALAC'[i]}.</b> {line}</p>{/each}
							<p class="note note-warn" style="font-size:13px"><b>Key point.</b> {probOf(kit, it).key}</p>
						{/if}
					</div>
				</div>

				{#if !x.graded}
					{#if it.kind === 'term'}
						<div class="seg" role="group" aria-label="Mark this definition">
							{#each termOpts as [v, label] (v)}
								<button aria-pressed={x.marks[itemKey(it)] === v} onclick={() => (x.marks[itemKey(it)] = v)}>{label} ({v})</button>
							{/each}
						</div>
					{:else if it.kind === 'prob'}
						<ScoreScale score={x.marks[itemKey(it)] ?? -1} onpick={(v) => (x.marks[itemKey(it)] = v)} />
					{:else}
						<p class="faint" style="font-size:12.5px">Tick each item you named and explained.</p>
					{/if}
				{:else if it.kind === 'prob'}
					<a class="btn btn-ghost btn-sm" style="align-self:flex-start" href={probOf(kit, it).href}>Practice this problem with the full self-check →</a>
				{/if}
			</section>
		{/each}
	{/each}

	{#if !x.graded}
		<div class="row wrap">
			<button class="btn btn-primary btn-lg" disabled={left > 0} onclick={finish}>See my score</button>
			{#if left}<span class="muted" style="font-size:13px">Mark {left} more {left === 1 ? 'answer' : 'answers'} first.</span>{/if}
		</div>
	{/if}
</div>

<style>
	.head {
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.score {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.score b {
		font-size: 34px;
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.score small {
		font-size: 15px;
		color: var(--text-2);
		font-weight: 500;
		margin-left: 4px;
	}
	.parts {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 24px;
		font-size: 14px;
	}
	.parts div {
		display: flex;
		gap: 8px;
	}
	.ph {
		font-family: var(--legal);
		font-size: 19px;
		font-weight: 600;
		margin-top: 8px;
	}
	.item {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.qt {
		font-size: 16px;
	}
	.facts {
		font-size: 14.5px;
		color: var(--text-2);
	}
	.two {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}
	.pane {
		border-radius: 6px;
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
		font-size: 14.5px;
	}
	.mine {
		background: var(--surface-2);
	}
	.ref {
		background: var(--success-soft);
	}
	.pre {
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}
	.ticks {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.ticks label {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 8px;
		align-items: start;
		cursor: pointer;
	}
	.ticks input {
		margin-top: 4px;
		width: 16px;
		height: 16px;
		accent-color: var(--success);
	}
	@media (max-width: 640px) {
		.two {
			grid-template-columns: 1fr;
		}
	}
</style>
