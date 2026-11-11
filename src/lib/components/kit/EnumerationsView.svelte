<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import EnumBody from './EnumBody.svelte';
	import GroupSeg from './GroupSeg.svelte';
	import RatingTag from './RatingTag.svelte';
	import { KIND, cardKey, type Kit, type KitEnum } from '$lib/kit';

	let { kit }: { kit: Kit } = $props();
	const st = $derived(kit.state());
	const title = $derived(Object.fromEntries(kit.groups.map((g) => [g.id, g.title])));

	let ch = $state('all');
	let star = $state(false);
	const likely = $derived(kit.focus.enums ?? {});
	let query = $state('');
	let open: string | null = $state(null);

	// …/enumerations#ch-7 filters to a group; #e-7.2 opens one list.
	$effect(() => {
		const h = page.url.hash;
		const c = /^#ch-(\d+)$/.exec(h);
		if (c) ch = c[1];
		const e = /^#e-([\d.]+)$/.exec(h);
		if (e) {
			open = e[1];
			tick().then(() => document.getElementById('en-' + e[1])?.scrollIntoView({ block: 'start' }));
		}
	});

	const haystack = $derived(kit.enums.map((e) => ({ e, text: JSON.stringify(e).toLowerCase() })));
	const list = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return haystack.filter((h) => (ch === 'all' || String(h.e.group) === ch) && (!star || likely[h.e.id]) && (!q || h.text.includes(q))).map((h) => h.e);
	});
	const groups = $derived.by(() => {
		const out: { group: number; items: KitEnum[] }[] = [];
		for (const e of list) {
			const g = out.at(-1);
			if (g && g.group === e.group) g.items.push(e);
			else out.push({ group: e.group, items: [e] });
		}
		return out;
	});

	async function toggle(id: string) {
		open = open === id ? null : id;
		if (open) {
			await tick();
			document.getElementById('en-' + id)?.scrollIntoView({ block: 'nearest' });
		}
	}
</script>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Every list in {kit.scope}, each item with a one-line explanation. Cards open in
		<b>Recall</b> mode: the memory aid and empty numbered slots. Say each item before you tap Show.
	</p>
	<input type="search" bind:value={query} placeholder="Search a list or word" aria-label="Search enumerations" />
	<div class="row wrap" style="gap:10px">
		<GroupSeg {kit} bind:value={ch} label="Filter by {kit.groupNoun}" />
		<div class="seg" role="group" aria-label="Open cards in">
			<button aria-pressed={st.emode === 'recall'} onclick={() => (st.emode = 'recall')}>Recall mode</button>
			<button aria-pressed={st.emode === 'study'} onclick={() => (st.emode = 'study')}>Study mode</button>
		</div>
	</div>

	<div class="row wrap">
		<div class="seg" role="group" aria-label="Which lists">
			<button aria-pressed={!star} onclick={() => (star = false)}>All lists</button>
			<button aria-pressed={star} onclick={() => (star = true)}>★ Likely only ({Object.keys(likely).length})</button>
		</div>
		<span class="muted num" style="font-size:13px">{list.length} list{list.length === 1 ? '' : 's'}</span>
	</div>

	{#if !list.length}
		<div class="card empty">No list matches “{query}”. Try one word.</div>
	{/if}
	{#each groups as g (g.group)}
		<h2 class="eyebrow grp">{title[g.group]}</h2>
		{#each g.items as e (e.id)}
			{@const o = open === e.id}
			<article class="card en" id="en-{e.id}">
				<button class="head" aria-expanded={o} onclick={() => toggle(e.id)}>
					<span class="muted num id">{e.id}</span>
					<span class="t">
						<span class="name">{e.t}</span>
						<span class="row wrap" style="gap:6px">
							<span class="tag {KIND[e.kind].tag}">{KIND[e.kind].label}</span>
							<span class="tag tag-line num">{e.it.length} items</span>
							{#if e.order}<span class="tag tag-line">order matters</span>{/if}
							{#if likely[e.id]}<span class="tag tag-star" title={likely[e.id]}>★ Likely</span>{/if}
							<RatingTag ratings={st.ratings} k={cardKey.enum(e.id)} />
						</span>
					</span>
					<span class="chev" aria-hidden="true">{o ? '−' : '+'}</span>
				</button>
				{#if o}
					<div class="body">
						{#if likely[e.id]}<p class="why-star"><b>★ Likely.</b> {likely[e.id]}</p>{/if}
						<EnumBody {e} mode={st.emode} ratings={st.ratings} onstudy={() => (st.emode = 'study')} />
					</div>
				{/if}
			</article>
		{/each}
	{/each}
</div>

<style>
	input[type='search'] {
		width: 100%;
		min-height: 42px;
		padding: 0 12px;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		border-radius: 6px;
	}
	input[type='search']:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: var(--focus);
	}
	.grp {
		margin-top: 10px;
	}
	.en {
		scroll-margin-top: 80px;
	}
	.head {
		width: 100%;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 12px;
		align-items: start;
		padding: 14px 16px;
		background: none;
		border: 0;
		border-radius: 8px;
		text-align: left;
		cursor: pointer;
	}
	.head:hover {
		background: var(--surface-2);
	}
	.id {
		font-size: 12.5px;
		padding-top: 3px;
		min-width: 3ch;
	}
	.t {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}
	.name {
		font-family: var(--legal);
		font-size: 17px;
		font-weight: 600;
		line-height: 1.3;
	}
	.chev {
		color: var(--text-2);
		font-size: 18px;
		line-height: 1.2;
	}
	.body {
		padding: 12px 16px 16px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
