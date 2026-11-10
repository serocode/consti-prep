<script lang="ts">
	import QuestionCard from './QuestionCard.svelte';
	import { Q_BY_ID } from '$lib/crimpro';
	import { endSession, fmtTime, scoreOf, startSession } from '$lib/crimpro-exam';
	import type { Session } from '$lib/store.svelte';

	let { s }: { s: Session } = $props();

	const items = $derived(
		s.qids.map((id, k) => {
			const ref = Q_BY_ID[id];
			const p = s.picks[k];
			return { k, ref, order: s.orders[k], picked: p, ok: p === ref.q.a };
		})
	);
	const score = $derived(scoreOf(s));
	const n = $derived(s.qids.length);
	const pct = $derived(Math.round((score / n) * 100));
	const missed = $derived(items.filter((x) => !x.ok));
	const skipped = $derived(items.filter((x) => x.picked === null).length);
	const secs = $derived(((s.finished ?? s.started) - s.started) / 1000);
	const timedOut = $derived(s.deadline !== null && s.finished !== null && s.finished >= s.deadline);

	// Score by case file, weakest first, so the next study block is obvious.
	const topics = $derived.by(() => {
		const m = new Map<string, { id: string; title: string; rules: string[]; ok: number; total: number }>();
		for (const x of items) {
			const t = m.get(x.ref.set.id) ?? { id: x.ref.set.id, title: x.ref.set.title, rules: x.ref.set.rules, ok: 0, total: 0 };
			t.total++;
			if (x.ok) t.ok++;
			m.set(t.id, t);
		}
		return [...m.values()].sort((a, b) => a.ok / a.total - b.ok / b.total || b.total - a.total);
	});

	let show: 'missed' | 'all' = $state('missed');
	const shown = $derived(show === 'missed' ? missed : items);

	function practiceMissed() {
		startSession({ kind: 'practice', qids: missed.map((x) => x.ref.qid), label: `Practice · ${missed.length} missed from your last ${s.kind}` });
		window.scrollTo(0, 0);
	}
</script>

<div class="col">
	<section class="card head">
		<span class="eyebrow">{s.label}</span>
		<div class="score">
			<b class="num">{score}<small>/ {n}</small></b>
			<span class="tag num {pct >= 75 ? 'tag-ok' : pct >= 50 ? 'tag-warn' : 'tag-bad'}">{pct}%</span>
		</div>
		<p class="muted num" style="font-size:13.5px">
			{fmtTime(secs)} used{timedOut ? ' · time ran out' : ''}{skipped ? ` · ${skipped} unanswered` : ''}
		</p>
		<div class="row wrap" style="margin-top:6px">
			{#if missed.length}
				<button class="btn btn-primary" onclick={practiceMissed}>Practice the {missed.length} I missed</button>
			{/if}
			<button class="btn btn-secondary" onclick={endSession}>New exam</button>
		</div>
	</section>

	<section class="card" aria-labelledby="topics-h">
		<h2 id="topics-h" class="eyebrow sec-h">By topic, weakest first</h2>
		<ul class="topics">
			{#each topics as t (t.id)}
				<li>
					<span class="t-name">{t.title} <span class="faint num">· Rule {t.rules.join(', ')}</span></span>
					<span class="num t-score" class:bad={t.ok < t.total}>{t.ok}/{t.total}</span>
					<a class="btn btn-ghost btn-sm" href="/crimpro/drill/{t.id}">Drill</a>
				</li>
			{/each}
		</ul>
	</section>

	<div class="between wrap">
		<h2 class="rev-h">Review</h2>
		<div class="seg" role="group" aria-label="Which questions">
			<button aria-pressed={show === 'missed'} onclick={() => (show = 'missed')}>Missed ({missed.length})</button>
			<button aria-pressed={show === 'all'} onclick={() => (show = 'all')}>All ({n})</button>
		</div>
	</div>

	{#if !shown.length}
		<div class="card empty">Nothing missed. Clean sweep.</div>
	{:else}
		{#each shown as x (x.k)}
			<details class="card item">
				<summary>
					<span class="tag {x.ok ? 'tag-ok' : 'tag-bad'}" aria-label={x.ok ? 'Correct' : 'Wrong'}>{x.ok ? '✓' : '✗'}</span>
					<span class="muted num">{x.k + 1}</span>
					<span class="s-q">{x.ref.q.q}{' '}<span class="faint">· {x.ref.set.title}</span></span>
				</summary>
				<div class="item-b">
					<QuestionCard ref={x.ref} order={x.order} picked={x.picked} reveal locked context keys={false} />
					<div class="row wrap">
						{#each x.ref.set.rules as r (r)}<a class="btn btn-ghost btn-sm" href="/crimpro/rules#r{r}">Rule {r} card</a>{/each}
					</div>
				</div>
			</details>
		{/each}
	{/if}
</div>

<style>
	.head {
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 4px;
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
	.sec-h {
		padding: 14px 16px 6px;
	}
	.topics {
		list-style: none;
		padding: 0;
	}
	.topics li {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 8px 6px 16px;
		border-top: 1px solid var(--border);
	}
	.t-name {
		flex: 1;
		min-width: 0;
		font-size: 14px;
	}
	.t-score {
		font-weight: 600;
		color: var(--success);
	}
	.t-score.bad {
		color: var(--error);
	}
	.rev-h {
		font-size: 16px;
		font-weight: 600;
	}
	.item > summary {
		list-style: none;
		cursor: pointer;
		display: flex;
		gap: 10px;
		align-items: baseline;
		padding: 12px 14px;
	}
	.item > summary::-webkit-details-marker {
		display: none;
	}
	.item > summary:hover {
		background: var(--surface-2);
	}
	.s-q {
		flex: 1;
		min-width: 0;
	}
	.item-b {
		padding: 4px 14px 14px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
