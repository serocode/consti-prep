<script lang="ts">
	import { cardKey, type Kit } from '$lib/kit';
	import type { Rating } from '$lib/store.svelte';
	import { answerKey } from '$lib/answerkey.svelte';
	import { md } from '$lib/text';

	let { kit }: { kit: Kit } = $props();
	const st = $derived(kit.state());
	const short = $derived(Object.fromEntries(kit.groups.map((g) => [g.id, g.short])));

	type Deck = 'enum' | 'term' | 'maxim' | 'case';
	interface Card {
		k: string;
		ask: string;
		q: string;
		/** Answer lines: [bold head, body] */
		a: [string, string][];
		lead?: string;
		star?: boolean;
	}

	const DECKS: Partial<Record<Deck, { label: string; cards: Card[] }>> = $derived({
		enum: {
			label: 'Enumerations',
			cards: kit.enums.map((e) => ({
				k: cardKey.enum(e.id),
				ask: `How many items? Name and explain each. · ${short[e.group]}`,
				q: e.t,
				lead: e.mem ? `Memory aid: ${e.mem}` : undefined,
				star: !!kit.focus.enums?.[e.id],
				a: e.it
			}))
		},
		term: {
			label: 'Definitions',
			cards: kit.terms.map((t) => ({ star: !!kit.focus.terms?.[t.id], k: cardKey.term(t.id), ask: `Define the term. · ${short[t.group]}`, q: t.t, a: [['', t.d], ...(t.x ? [['Don’t confuse', t.x] as [string, string]] : [])] }))
		},
		...(kit.maxims && {
			maxim: { label: 'Latin maxims', cards: kit.maxims.map((x) => ({ k: cardKey.maxim(x.m), ask: `What does it mean? Which ${kit.groupNoun}? · ${x.label}`, q: x.m, a: [['', x.mean]] as [string, string][] })) }
		}),
		...(kit.cases && {
			case: {
				label: 'Cases',
				cards: kit.cases.map((c) => ({ k: cardKey.case(c.id), ask: `State the doctrine and the ${kit.groupNoun} rule.`, q: c.name, a: [['Doctrine', c.doc], ['Rule', c.ch]] as [string, string][] }))
			}
		})
	});

	let deck: Deck = $state('enum');
	let weakOnly = $state(false);
	let starOnly = $state(false);
	let cur: Card | null = $state(null);
	let rev = $state(false);

	const ratings = $derived(st.ratings);
	const pool = $derived(DECKS[deck]!.cards.filter((c) => (!weakOnly || ratings[c.k] === 'blank' || ratings[c.k] === 'shaky') && (!starOnly || c.star)));
	const counts = $derived.by(() => {
		const n = { got: 0, shaky: 0, blank: 0, none: 0 };
		for (const c of DECKS[deck]!.cards) n[ratings[c.k] ?? 'none']++;
		return n;
	});

	// Blank cards come back most, then shaky, then unrated, then known ones.
	const weight = (c: Card) => ({ blank: 4, shaky: 3, got: 1 })[ratings[c.k] as Rating] ?? 2;
	function next() {
		const p = pool;
		rev = false;
		if (!p.length) {
			cur = null;
			return;
		}
		const opts = p.length > 1 ? p.filter((c) => c.k !== cur?.k) : p;
		let r = Math.random() * opts.reduce((s, c) => s + weight(c), 0);
		let pick = opts[0];
		for (const c of opts) {
			r -= weight(c);
			if (r <= 0) {
				pick = c;
				break;
			}
		}
		cur = pick;
	}
	function rate(r: Rating) {
		if (cur) st.ratings[cur.k] = r;
		next();
	}
	function choose(d: Deck) {
		deck = d;
		if (d !== 'enum' && d !== 'term') starOnly = false;
		cur = null;
		next();
	}
	function setWeak(v: boolean) {
		weakOnly = v;
		cur = null;
		next();
	}
	next();

	function onkeydown(e: KeyboardEvent) {
		if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).closest('input, textarea, select, button, a')) return;
		if (!cur) return;
		if (!rev && (e.key === ' ' || e.key === 'Enter')) {
			e.preventDefault();
			rev = true;
		} else if (rev && ['1', '2', '3'].includes(e.key)) {
			rate((['got', 'shaky', 'blank'] as Rating[])[Number(e.key) - 1]);
		}
	}
</script>

<svelte:window {onkeydown} />

<div class="col" style="max-width:760px;margin:0">
	<p class="muted">Say the answer out loud before you reveal it. Cards you mark “Went blank” come back more often.</p>
	<div class="row wrap" style="gap:10px">
		<div class="seg" role="group" aria-label="Deck">
			{#each Object.entries(DECKS) as [d, v] (d)}
				<button aria-pressed={deck === d} onclick={() => choose(d as Deck)}>{v.label}</button>
			{/each}
		</div>
		<div class="seg" role="group" aria-label="Which cards">
			<button aria-pressed={!weakOnly} onclick={() => setWeak(false)}>All cards</button>
			<button aria-pressed={weakOnly} onclick={() => setWeak(true)}>Blank + shaky only</button>
		</div>
		{#if deck === 'enum' || deck === 'term'}
			<div class="seg" role="group" aria-label="Exam focus">
				<button aria-pressed={!starOnly} onclick={() => { starOnly = false; cur = null; next(); }}>Everything</button>
				<button aria-pressed={starOnly} onclick={() => { starOnly = true; cur = null; next(); }}>★ Likely only</button>
			</div>
		{/if}
	</div>
	<div class="row wrap" style="gap:6px">
		<span class="tag tag-ok num">Got it: {counts.got}</span>
		<span class="tag tag-warn num">Shaky: {counts.shaky}</span>
		<span class="tag tag-bad num">Blank: {counts.blank}</span>
		<span class="tag tag-line num">Not rated: {counts.none}</span>
	</div>

	<section class="card flash" aria-live="polite">
		{#if !cur}
			<p class="muted" style="text-align:center;padding:30px 0">No cards match these filters yet. Drill all cards first.</p>
		{:else}
			<span class="eyebrow">{cur.star ? '★ Likely · ' : ''}{cur.ask}</span>
			<h2 class="q legal">{cur.q}</h2>
			{#if rev || answerKey.on}
				<div class="ans">
					{#if cur.lead}<div class="blk k-mem"><p>{cur.lead}</p></div>{/if}
					{#if deck === 'enum'}
						<ol>{#each cur.a as [h, b], i (i)}<li><b>{@html md(h)}</b>{#if b} — {@html md(b)}{/if}</li>{/each}</ol>
					{:else}
						{#each cur.a as [h, b], i (i)}<p>{#if h}<b>{h}:</b> {/if}{@html md(b)}</p>{/each}
					{/if}
				</div>
				<div class="rate">
					<button class="r-got" onclick={() => rate('got')}>Got it <kbd>1</kbd></button>
					<button class="r-shaky" onclick={() => rate('shaky')}>Shaky <kbd>2</kbd></button>
					<button class="r-blank" onclick={() => rate('blank')}>Went blank <kbd>3</kbd></button>
				</div>
			{:else}
				<div class="row">
					<button class="btn btn-primary" onclick={() => (rev = true)}>Show answer</button>
					<button class="btn btn-ghost" onclick={next}>Skip</button>
					<span class="faint hide-sm" style="font-size:12.5px">or press Space</span>
				</div>
			{/if}
		{/if}
	</section>
</div>

<style>
	.flash {
		padding: 20px;
		min-height: 220px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.q {
		font-size: 21px;
		font-weight: 600;
		line-height: 1.35;
	}
	.ans {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.ans ol {
		padding-left: 1.3em;
		display: grid;
		gap: 4px;
	}
	.rate {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.rate button {
		flex: 1 1 120px;
		min-height: 44px;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		border: 1.5px solid;
	}
	.r-got {
		background: var(--success-soft);
		color: var(--success);
		border-color: var(--success);
	}
	.r-shaky {
		background: var(--warning-soft);
		color: var(--warning);
		border-color: var(--warning);
	}
	.r-blank {
		background: var(--error-soft);
		color: var(--error);
		border-color: var(--error);
	}
	kbd {
		font: inherit;
		font-size: 11px;
		opacity: 0.6;
		margin-left: 4px;
	}
</style>
