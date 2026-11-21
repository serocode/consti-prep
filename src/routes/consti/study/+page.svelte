<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import { TOPICS, type StudyList } from '$lib/consti-study';
	import { LIKELY_CASES } from '$lib/focus/consti';
	import { CASES, PARTS, PART_SHORT, type PartNo } from '$lib/problems';
	import { md } from '$lib/text';

	const NAME = Object.fromEntries(CASES.map((c) => [c.id, c.name]));
	const PART_NOS: PartNo[] = [1, 2, 3, 4];
	const star = (caseIds: string[]) => caseIds.map((id) => LIKELY_CASES[id]).find(Boolean);

	let part = $state('all');
	let likely = $state(false);
	let recall = $state(false);
	let query = $state('');
	let open: Record<string, boolean> = $state({});
	let shown: Record<string, boolean> = $state({});

	const q = $derived(query.trim().toLowerCase());
	const text = (t: (typeof TOPICS)[number]) =>
		[t.title, t.prov, ...t.text, ...(t.req?.items ?? []), ...(t.exc?.items ?? []), ...(t.exx?.items ?? []), ...t.notes, t.trap ?? '', ...t.cases.map((c) => NAME[c] ?? '')]
			.join(' ')
			.toLowerCase();
	const list = $derived(TOPICS.filter((t) => (part === 'all' || String(t.part) === part) && (!likely || star(t.cases)) && (!q || text(t).includes(q))));
	const allOpen = $derived(list.length > 0 && list.every((t) => open[t.id]));

	function toggleAll() {
		const v = !allOpen;
		for (const t of list) open[t.id] = v;
	}

	// …#s-<id> opens that topic.
	$effect(() => {
		const m = /^#s-(.+)$/.exec(page.url.hash);
		if (!m) return;
		open[m[1]] = true;
		tick().then(() => document.getElementById('s-' + m[1])?.scrollIntoView({ block: 'start' }));
	});

	const blocks = (t: (typeof TOPICS)[number]): [string, string, StudyList | undefined, 'ol' | 'ul'][] => [
		['req', 'k-req', t.req ? { label: t.req.label ?? 'Requisites', items: t.req.items } : undefined, 'ol'],
		['exc', 'k-exc', t.exc ? { label: t.exc.label ?? 'Exceptions', items: t.exc.items } : undefined, 'ol'],
		['exx', 'k-exx', t.exx ? { label: t.exx.label ?? 'Exception to the exception', items: t.exx.items } : undefined, 'ul']
	];
</script>

<svelte:head><title>Study notes · Consti I · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		The 1987 Constitution behind the 28 cases, topic by topic: the text to memorize, <span class="key req">requisites</span>,
		<span class="key exc">exceptions</span>, <span class="key exx">exceptions to the exception</span>, notable details and the exam trap.
		Turn on <b>Recall</b> to hide the lists and say them first.
	</p>
	<input type="search" bind:value={query} placeholder="Search a topic, provision or case" aria-label="Search study notes" />
	<div class="row wrap" style="gap:10px">
		<div class="seg" role="group" aria-label="Filter by part">
			<button aria-pressed={part === 'all'} onclick={() => (part = 'all')}>All</button>
			{#each PART_NOS as n (n)}
				<button aria-pressed={part === String(n)} onclick={() => (part = String(n))} title={PARTS[n]}>{PART_SHORT[n]}</button>
			{/each}
		</div>
		<div class="seg" role="group" aria-label="Which topics">
			<button aria-pressed={!likely} onclick={() => (likely = false)}>All topics</button>
			<button aria-pressed={likely} onclick={() => (likely = true)}>★ Likely only</button>
		</div>
		<div class="seg" role="group" aria-label="Lists">
			<button aria-pressed={!recall} onclick={() => ((recall = false), (shown = {}))}>Show all</button>
			<button aria-pressed={recall} onclick={() => ((recall = true), (shown = {}))}>Recall</button>
		</div>
		{#if list.length}
			<button class="btn btn-ghost btn-sm" onclick={toggleAll}>{allOpen ? 'Close all' : 'Open all'}</button>
		{/if}
	</div>

	{#if !list.length}<div class="card empty">No topic matches.</div>{/if}
	{#each PART_NOS as n (n)}
		{@const inPart = list.filter((t) => t.part === n)}
		{#if inPart.length}
			<h2 class="ph">{PARTS[n]}</h2>
			{#each inPart as t (t.id)}
				{@const o = !!open[t.id]}
				{@const s = star(t.cases)}
				<article class="card tp" id="s-{t.id}">
					<button class="head" aria-expanded={o} onclick={() => (open[t.id] = !o)}>
						<span class="t">
							<span class="name">{t.title}</span>
							<span class="muted" style="font-size:13px">{t.prov}</span>
							<span class="row wrap" style="gap:6px">
								{#if t.req}<span class="tag tag-en">{t.req.items.length} requisites</span>{/if}
								{#if t.exc}<span class="tag tag-ok">{t.exc.items.length} exceptions</span>{/if}
								{#if s}<span class="tag tag-star" title={s}>★ Likely</span>{/if}
							</span>
						</span>
						<span class="chev" aria-hidden="true">{o ? '−' : '+'}</span>
					</button>
					{#if o}
						<div class="body">
							<div class="blk k-mem">
								<h4>The Constitution provides</h4>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -- md() escapes all input first -->
								{#each t.text as x, i (i)}<p class="prov-t">{@html md(x)}</p>{/each}
							</div>
							{#each blocks(t) as [k, cls, b, tag] (k)}
								{#if b}
									{@const key = `${t.id}-${k}`}
									<div class="blk {cls}">
										<h4>{b.label}</h4>
										{#if recall && !shown[key]}
											<div class="row wrap" style="gap:10px">
												<span class="muted" style="font-size:13.5px">{b.items.length} item{b.items.length === 1 ? '' : 's'}. Say them, then check.</span>
												<button class="btn btn-secondary btn-sm" onclick={() => (shown[key] = true)}>Show</button>
											</div>
										{:else if tag === 'ol'}
											<!-- eslint-disable-next-line svelte/no-at-html-tags -- md() escapes all input first -->
											<ol>{#each b.items as x, i (i)}<li>{@html md(x)}</li>{/each}</ol>
										{:else}
											<!-- eslint-disable-next-line svelte/no-at-html-tags -- md() escapes all input first -->
											<ul>{#each b.items as x, i (i)}<li>{@html md(x)}</li>{/each}</ul>
										{/if}
									</div>
								{/if}
							{/each}
							<div class="blk plain">
								<h4>Notable details</h4>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -- md() escapes all input first -->
								<ul>{#each t.notes as x, i (i)}<li>{@html md(x)}</li>{/each}</ul>
							</div>
							{#if t.table}
								<div class="blk k-cls" style="overflow-x:auto">
									<h4>{t.table.label}</h4>
									<table>
										<thead><tr>{#each t.table.head as h, i (i)}<th>{h}</th>{/each}</tr></thead>
										<tbody>
											{#each t.table.rows as r, i (i)}
												<tr>
													<th scope="row">{r[0]}</th>
													<!-- eslint-disable-next-line svelte/no-at-html-tags -- md() escapes all input first -->
													<td>{@html md(r[1])}</td>
													<!-- eslint-disable-next-line svelte/no-at-html-tags -- md() escapes all input first -->
													<td>{@html md(r[2])}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
							{#if t.trap}<div class="blk trap"><h4>Exam trap</h4><p>{t.trap}</p></div>{/if}
							{#if s}<p class="why-star"><b>★ Likely.</b> {s}</p>{/if}
							<div class="cases">
								<span class="muted" style="font-size:13px">Cases:</span>
								{#each t.cases as c (c)}
									<span class="cs">
										<a href="/consti/cases#c-{c}"><i>{NAME[c]}</i></a>
										<a class="btn btn-ghost btn-sm" href="/p/{c}-drill">Drill</a>
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</article>
			{/each}
		{/if}
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
	.key {
		padding: 0 4px;
		border-radius: 4px;
		font-weight: 600;
	}
	.key.req {
		background: var(--english-soft);
		color: var(--english);
	}
	.key.exc {
		background: var(--success-soft);
		color: var(--success);
	}
	.key.exx {
		background: var(--warning-soft);
		color: var(--warning);
	}
	.ph {
		font-size: 16px;
		font-weight: 600;
		margin-top: 10px;
	}
	.tp {
		scroll-margin-top: 80px;
	}
	.head {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr auto;
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
	.t {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.name {
		font-family: var(--legal);
		font-size: 17px;
		font-weight: 600;
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
	.prov-t {
		font-family: var(--legal);
		line-height: 1.55;
	}
	.prov-t + .prov-t {
		margin-top: 6px;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
	}
	th,
	td {
		border-bottom: 1px solid var(--border);
		padding: 7px 9px;
		text-align: left;
		vertical-align: top;
	}
	tbody tr:last-child > * {
		border-bottom: 0;
	}
	thead th {
		font-size: 13px;
		color: var(--text-2);
	}
	tbody th {
		font-weight: 600;
		min-width: 110px;
	}
	.cases {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 14px;
	}
	.cs {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
